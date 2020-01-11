<template>
  <div class="container">
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-card>
          <v-card-title><h3>{{ user.attributes.email }}'s profile</h3></v-card-title>
          <v-card-text>
            <profile-form
              :user="user"
              :fields="fields"
              v-if="user"
            />
          </v-card-text>
           <v-card-actions>
              <v-btn
                icon
                @click="show = !show"
                v-if="user"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-actions>
              <v-list-item>
                <v-list-item-content>
                  <v-btn
                    text
                    @click="mfa = !mfa"
                  >
                    Multifactor Authentication
                    <v-icon>{{ profilePic ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <amplify-set-mfa v-bind:mfaConfig="mfaConfig" v-if="mfa"></amplify-set-mfa>
                  <v-btn
                    text
                    @click="profilePic = !profilePic"
                  >
                    Profile Pic
                    <v-icon>{{ mfa ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <div v-if="profilePic">
                    <amplify-photo-picker v-bind:photoPickerConfig="photoPickerConfig"/>
                    <amplify-s3-image :imagePath="imagePath" />
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
              </div>
            </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import { Auth, Storage, Logger } from 'aws-amplify'
import AmplifyStore from '../store/index'
import ProfileForm from '../components/ProfileForm'
export default {
  name: 'Profile',
  data: () => {
    return {
      show: false,
      profilePic: false,
      imagePath: `${AmplifyStore.state.user.username}/avatar`,
      photoPickerConfig: {
        header: 'Upload Profile Pic',
        accept: 'image/*',
        path: `${AmplifyStore.state.user.username}/`,
        defaultName: 'avatar'
      },
      mfa: false,
      fields: [
        { type: 'string', name: 'email', label: 'Email' },
        { type: 'string', name: 'phone_number', label: 'Phone Number' }
      ]
    }
  },
  components: {
    ProfileForm
  },
  methods: {
    toggleAccordion: function (el) {
      this[el] = !this[el]
    }
  },
  computed: {
    mfaConfig: function () {
      let that = this
      return {
        mfaDescription: 'Select any multifactor authentication option',
        mfaTypes: ['TOTP', 'SMS', 'None'],
        cancelHandler: function () {
          that.toggleAccordion('mfa')
        }
      }
    },
    user: function () {
      return AmplifyStore.state.user
    },
    profilePicAccordion: function () {
      return {
        'is-closed': !this.profilePic,
        'is-primary': this.profilePic,
        'is-dark': !this.profilePic
      }
    },
    mfaAccordion: function () {
      return {
        'is-closed': !this.mfa,
        'is-primary': this.mfa,
        'is-dark': !this.mfa
      }
    }
  }
}
</script>
