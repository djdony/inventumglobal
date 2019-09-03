ф<template lang='pug'>
  v-content.details-page
    v-container

      //- GENERAL INFO PART

      v-card.details__section.general-info
        .general-info__banner
          v-img(src='/img/details/banner.png' height='250')
        .general-info__content
          .content__row
            .basic-info
              h1.info__title
                hotel-stars(id='9')
                span(v-text='hotel.name')

              .info__regions(v-text='hotel.location.name')

          .content__row
            .details
              .details__block
                .block__title Physical Features 
                table.block__list
                  tr.block-list__item
                    td.item__param Built
                      td.item__value : {{ hotel.built }}
                  tr.block-list__item
                    td.item__param Renovated
                      td.item__value : {{ hotel.renovated }}
                  tr.block-list__item
                    td.item__param Total Area
                      td.item__value : {{ hotel.area }}
                    
              .details__block
                .block__title Rooms &amp; Villas
                table.block__list
                  tr.block-list__item
                    td.item__param Total Rooms
                    td.item__value : {{ roomsQty }}


              .details__block
                .block__title Meetings &amp; Events
                table.block__list
                  tr.block-list__item
                    td.item__param Total Meeting Rooms
                    td.item__value :


              .details__block
                .block__title Location 
                table.block__list
                  tr.block-list__item
                    td.item__param Region
                    td.item__value : {{ hotel.location.name }}


              .details__block
                .block__title Distance 
                table.block__list
                  tr.block-list__item
                    td.item__param Airport
                    td.item__value :


      //- OVERVIEW PART

      v-card.details__section.overview
        h3.section__title Overview
        .overview__content
          p(v-text='hotel.description')


      //- OVERVIEW PART

      v-card.details__section.gallery
        h3.section__title Photo Gallery
        .images-wrapper
          v-img(
            v-for="m in hotel.media.slice(0, 6)"
            :src='m.url'
            :key="m.id"
            :aspect-ratio="1"
            @click="showGallery = true"
          )

      //- ROOMS PART

      v-card.details__section.rooms
        h3.section__title Rooms &amp; Suites
        .rooms__count
          .count__item
            b Number of rooms: 
            span {{ roomsQty }}

        rooms(v-model="hotel.rooms")
              
        carousel(:media="roomsMedia" v-if='roomsMedia.length > 0') 

        //- MEETING SPACE PART

      v-card.details__section.restaurants
        h3.section__title Restaurants
        restaurant-table(:restaurants='hotel.restaurants')

        carousel(:media="restaurantsMedia" v-if='restaurantsMedia.length > 0')
        //- MEETING SPACE PART
      v-card.details__section.rooms
        h3.section__title Meeting space
        .rooms__count
          .count__item
            b Number of rooms:
            span 543
          .count__item
            b Suites:
            span 80
          .count__item
            b Guest Rooms:
            span 463
          .count__item
            b Villas:
            span -
        meeting-rooms(v-model="hotel.meeting_rooms")
        carousel(:media="meetingRoomsMedia" v-if='meetingRoomsMedia.length > 0')
      location(v-model="hotel")
    v-dialog(v-model="showGallery")
      v-btn(dark icon @click="showGallery = false")
        v-icon mdi-close
      gallery(v-model="hotel.media")
</template>

<script>
import Hotel from '@/models/Hotel'
import HotelStars from '@/components/HotelStars'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import MeetingRooms from '@/components/MeetingRoom'
import Location from '@/components/Location'
import Rooms from '@/components/Rooms'
import RestaurantTable from '@/components/Restaurant'
import Carousel from '@/components/Carousel'
import Gallery from '@/components/Gallery'

export default {
  data() {
    return {
      showGallery: false
    }
  },
  async asyncData({ route }) {
    try {
      let hotel = await Hotel.include([
        'rooms',
        'rooms.media',
        'rooms.room_type',
        'location',
        'types',
        'meeting_rooms',
        'meeting_rooms.media',
        'restaurants',
        'restaurants.media',
        'media'
      ]).find(route.params.id)

      return { hotel }
    } catch (err) {
      this.showSnackbar({
        message: 'An error occured while loading the data',
        color: 'red'
      })
    }
  },
  created() {},
  methods: {
    ...mapMutations({ showSnackbar: 'snackbar/showSnackbar' }),
    ...mapActions({ addToCart: 'cart/addHotel' })
  },
  computed: {
    roomsQty: function() {
      if (this.hotel && this.hotel.hasOwnProperty('rooms')) {
        return this.hotel.rooms.reduce((a, b) => a + b.qty, 0)
      } else {
        return 'N/A'
      }
    },
    roomsMedia: function(){
      return this.hotel.rooms.reduce((a, b) => {
        b.media.forEach(m => a.push({ ...m, name: b.room_type.name }))
        return a
      }, [])
    },
    restaurantsMedia: function(){
      return this.hotel.restaurants.reduce((a, b) => {
        b.media.forEach(m => a.push({ ...m, name: b.name }))
        return a
      }, [])
    },
    meetingRoomsMedia: function(){
      return this.hotel.meeting_rooms.reduce((a, b) => {
        b.media.forEach(m => a.push({ ...m, name: b.name }))
        return a
      }, [])
    }
  },
  components: {
    RestaurantTable,
    MeetingRooms,
    HotelStars,
    Location,
    Rooms,
    Carousel,
    Gallery
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/pages/details.sass'

</style>
