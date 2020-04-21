<style scoped>
.footer-link{
 color: #ffffff;
  text-decoration: none;
}

</style>
<template>
  <v-footer
    color="dark lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
      >
      <v-icon size="24px">{{ icon }}</v-icon>
      </v-btn>
      <v-col
        class="dark lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <a class="footer-link" href="http://rvodevelopment.com/" target="_blank">{{ new Date().getFullYear() }} — <strong>RVODevelopment</strong></a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook'
      ],
    }),
  }
</script>
