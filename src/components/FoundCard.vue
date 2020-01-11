<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-card
          class="mx-auto"
        >
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(image, i) in information.images"
              :key="i"
            >
              <v-sheet
                color="deep-purple accent-7"
                height="100%"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3"><img :src="image" /></div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
            <v-card-title>
              {{ information.shortDescription }}
            </v-card-title>
            <v-card-subtitle>
              {{ information.longDescription }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text><v-icon>fa-share-alt</v-icon></v-btn>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="show = !show"
                v-if="user && information.author === user.attributes.email"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition v-if="user && information.author === user.attributes.email">
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-icon class="far fa-user-circle"></v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user.attributes.email }}</v-list-item-title>
                  <v-list-item-subtitle>tel: {{ information.contactNumber }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="information.reward">Se ofrece recompensa</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-speed-dial
              v-model="fab"
              :bottom="bottom"
              :right="right"
              :direction="direction"
              :open-on-hover="hover"
              :transition="transition"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="blue darken-2"
                  dark
                  fab
                >
                  <v-icon v-if="fab">mdi-close</v-icon>
                  <v-icon v-else>fa-play</v-icon>
                </v-btn>
              </template>
              <v-btn
                fab
                dark
                small
                color="green"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="indigo"
              >
                <v-icon @click="deleteFoundCard">mdi-delete</v-icon>
              </v-btn>
            </v-speed-dial>
            </v-card-actions>
              </div>
            </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import AmplifyStore from '../store/index'

export default {
  props: ['information'],
  data () {
    return {
      profile: AmplifyStore.state.user,
      direction: 'top',
      fab: false,
      hover: true,
      right: true,
      bottom: true,
      transition: 'slide-y-reverse-transition',
      show: false
    }
  },
  computed: {
    user () {
      return AmplifyStore.state.user
    }
  },
  methods: {
    deleteFoundCard: function () {
      console.log('delete')
      this.setSnack('Se borro publicacion.')
    },
    ...mapMutations({
      setSnack: 'store/setSnack'
    })
  }
}
</script>
