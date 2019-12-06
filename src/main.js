import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Amplify from 'aws-amplify'
import {
  components
} from 'aws-amplify-vue'
import AwsExports from './aws-exports'

Vue.config.productionTip = false

Amplify.configure(AwsExports)

new Vue({
  router,
  store,
  vuetify,
  components: {
    ...components
  },
  render: h => h(App)
}).$mount('#app')
