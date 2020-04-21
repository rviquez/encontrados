<style scoped>
.profile {
  cursor: pointer;
}
</style>
<template>
<div>
    <v-btn 
      v-if="!isAuthenticated"
      text 
      color="grey lighten-5"
      id="qsLoginBtn"
      @click.prevent="login"
      >Login
  </v-btn>
  <v-menu
    v-if="isAuthenticated"
    transition="scale-transition"
    :close-on-content-click="true"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-avatar  v-on="on" class="profile">
      <img
          :src="profile.picture"
          alt="Proile picture"
      >
      </v-avatar>
    </template>
    <v-card dark>
    <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">{{ profile.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
         <v-list-item link @click.prevent="logout">
          <v-list-item-content>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</div>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true
    }),
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
      this.$router.push({ path: "/" });
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  },
  data() {
    return {
      isAuthenticated: false,
      profile: {},
    };
  }
};
</script>