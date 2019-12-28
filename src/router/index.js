import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../components/Profile.vue'
import {
  components,
  AmplifyEventBus,
  AmplifyPlugin
} from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import AmplifyStore from '../store/index'

Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)

let user

getUser().then((user, error) => {
  if (user) {
    // router.push({
    //   path: '/'
    // })
  }
})

AmplifyEventBus.$on('authState', async (state) => {
  if (state === 'signedOut') {
    user = null
    AmplifyStore.commit('setUser', null)
    router.push({
      path: '/auth'
    }).catch(() => {})
  } else if (state === 'signedIn') {
    user = await getUser()
    router.push({
      path: '/'
    }).catch(() => {})
  }
})

function getUser () {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
    if (data && data.signInUserSession) {
      AmplifyStore.commit('setUser', data)
      return data
    }
  }).catch((e) => {
    AmplifyStore.commit('setUser', null)
    return null
  })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    meta: {
      requiresAuth: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Authenticator',
    component: components.Authenticator
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser()
    if (!user) {
      return next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      })
    }
    return next()
  }
  return next()
})

export default router
