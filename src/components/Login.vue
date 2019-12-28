<style scoped>
.profile {
  cursor: pointer;
}
</style>
<template>
<div>
    <v-btn
      v-if="!user"
      text
      color="grey lighten-5"
      id="qsLoginBtn"
      @click.prevent="login"
      >Login
  </v-btn>
  <v-menu
    v-if="user"
    transition="scale-transition"
    :close-on-content-click="true"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-avatar  v-on="on" class="profile">
      <v-icon class="far fa-user-circle"></v-icon>
      </v-avatar>
    </template>
    <v-card dark>
    <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ user.attributes.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
         <v-list-item>
          <v-list-item-content>
            <v-list-item-title><amplify-sign-out v-if="user"></amplify-sign-out></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</div>
</template>

<script>
import AmplifyStore from '../store/index'
export default {
  name: 'NavBar',
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  computed: {
    user () {
      return AmplifyStore.state.user
    }
  },
  methods: {
    login: function () {
      this.$router.push('/auth')
    }
  }
}
</script>
