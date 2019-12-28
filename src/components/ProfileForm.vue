<template>
<v-container>
  <v-layout
      text-center
      wrap
    >
    <v-flex xs12 sm4 med4>
        <v-text-field
          v-for="field in fields" v-bind:key="field.name"
          v-model="user[field.name]"
          :label="field.label || field.name"
          readonly
        ></v-text-field>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import AmplifyStore from '../store/index'
export default {
  name: 'ProfileForm',
  props: ['fields'],
  data () {
    return {
      user: {}
    }
  },
  async mounted () {
    if (AmplifyStore.state.user) {
      const currentUser = await this.$Amplify.Auth.currentUserInfo()
      this.user = {
        username: currentUser.username,
        ...currentUser.attributes
      }
    }
  },
  methods: {
    save () {
      const cognitoUser = AmplifyStore.state.user
      if (!this.user || !cognitoUser) { return }
      this.$Amplify.Auth.updateUserAttributes(cognitoUser, this.user).then((res) => {
        console.log(res)
      }).catch(e => console.log(e))
    }
  }
}
</script>
