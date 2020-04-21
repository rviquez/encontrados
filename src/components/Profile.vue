<template>
  <div class="container">
    <div class="row align-items-center profile-header">
      <div class="col-md-2">
        <v-avatar class="profile" color="grey" size="124">
        <img :src="profile.picture" alt="User's profile picture" class="rounded-circle img-fluid profile-picture">
        </v-avatar>
      </div>
      <div class="col-md">
        <h2>{{ profile.name }}</h2>
        <p class="lead text-muted">{{ profile.email }}</p>
      </div>
    </div>

    <div class="row">
      <pre class="rounded"><code class="json">{{ JSON.stringify(profile, null, 2) }}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: this.$auth.profile
    };
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
    }
  }
};
</script>
