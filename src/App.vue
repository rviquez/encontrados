<style scoped>
.home {
  cursor: pointer;
}
</style>
<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title class="home headline text-uppercase" color="primary" >
        <router-link to="/" tag="span"><v-icon>fa-paw</v-icon> Encontrados</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <Login/>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <Snackbar/>
    <Footer/>
  </v-app>
</template>

<script>
import Login from './components/Login'
import Error from './components/Error'
import Footer from './components/Footer'
import Snackbar from './views/Snackbar'

export default {
  name: 'App',

  components: {
    Login,
    Error,
    Snackbar,
    Footer
  },
  methods: {

  },
  data: () => ({
    collapse: false,
  }),
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch {
      // Supress the 'not logged in' error as we can illegitimately get that
      // when processing the callback url
    }
  } 
};
</script>
