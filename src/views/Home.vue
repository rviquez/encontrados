<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12 sm4 med4 v-for="anouncement in anouncements" v-bind:key="anouncement.id">
       <FoundCard v-bind:information="anouncement"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import FoundCard from '@/components/FoundCard.vue'

export default {
  name: 'home',
  data () {
    return {
      anouncements: [
        {
          id: 1,
          title: 'Perrito',
          shortDescription: 'Necesita casa',
          longDescription: 'Encontrado en la calle de la casa',
          author: 'robertoviquez@gmail.com',
          contactNumber: '123456789',
          reward: true,
          images: [
            'https://placedog.net/640/480?random',
            'https://placedog.net/620/480?random',
            'https://placedog.net/640/450?random',
            'https://placedog.net/630/480?random',
            'https://placedog.net/640/470?random'
          ]
        },
        {
          id: 2,
          title: 'Gatito',
          shortDescription: 'Necesita casa',
          longDescription: 'Encontrado en la calle de la casa',
          author: 'robertoviquez@gmail.com',
          contactNumber: '123456789',
          reward: false,
          images: [
            'http://placekitten.com/g/250/300',
            'http://placekitten.com/g/200/300',
            'http://placekitten.com/g/260/300',
            'http://placekitten.com/g/240/300',
            'http://placekitten.com/g/230/300'
          ]
        }
      ]
    }
  },
  components: {
    FoundCard
  }
}
</script>
