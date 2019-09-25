<template lang='pug'>
  v-content.details-page
    v-container

      //- GENERAL INFO PART

      v-card.details__section.general-info
        .general-info__banner

          v-img(
            v-if='hotel.media.length > 0'
            :src='hotel.media[0].url'
            height='250'
          )
        .general-info__content
          .content__row
            .basic-info
              h1.info__title
                .hotel-stars
                  span(v-text='hotel.star.name').stars__value
                span(v-text='hotel.name')

              //.info__regions(v-text='hotel.location.name')
              .info__regions(v-text="`${city} / ${region}`")


          .content__row
            .details
              .details__block
                .block__title Physical Features 
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param Built
                        td.item__value : {{ hotel.built }}
                    tr(v-if='hotel.renovated.length > 0').block-list__item
                      td.item__param Renovated
                        td.item__value : {{ hotel.renovated }}
                    tr.block-list__item
                      td.item__param Total Area
                        td.item__value : {{ hotel.area }}
                    
              .details__block
                .block__title Rooms &amp; Villas
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param Total Rooms
                      td.item__value : {{ roomsQty }}
                    tr.block-list__item
                      td.item__param Guest Rooms
                      td.item__value : {{ roomTypes.guests }}
                    tr.block-list__item
                      td.item__param Suites
                      td.item__value : {{ roomTypes.suites }}
                    tr.block-list__item
                      td.item__param Villas
                      td.item__value : {{ roomTypes.villas }}


              .details__block
                .block__title Meetings &amp; Events
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param Total Meeting Rooms
                      td.item__value : {{ hotel.meeting_rooms.length }}
                    tr.block-list__item
                      td.item__param Largest space
                      td.item__value(v-html="` : ${largestSpace}`")


              .details__block
                .block__title Location 
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param Region
                      td.item__value : {{ hotel.location.name }}
                    tr.block-list__item
                      td.item__param Airport
                      td.item__value(v-if="hotel.hasOwnProperty('distance')")
                        | : {{ hotel.distance.pivot.distance }} km


              .details__block
                .block__title Information
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param Address
                      td.item__value : {{ hotel.address }}
                    tr.block-list__item
                      td.item__param Web
                      td.item__value : {{ hotel.www }}

          // Tabs
        v-tabs
          v-tab Overview
          v-tab Gallery
          v-tab Rooms
          v-tab Meeting rooms
          v-tab Restaurants
          //v-tab Amenities
          v-tab Location

            //- OVERVIEW PART
          v-tab-item
            v-card
      v-card.details__section.overview
        h3.section__title Overview
        .overview__content
          p(v-html='hotel.description')


      //- Photo Gallery
      v-tab-item
      v-card(v-if='hotel.media.length > 0').details__section.gallery
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
      v-tab-item
      v-card.details__section.rooms
        h3.section__title Rooms &amp; Suites
        .rooms__count
          .count__item
            b Number of rooms:
            span {{ roomsQty }}

        rooms(v-model="hotel.rooms")

        carousel(:media="roomsMedia" v-if='roomsMedia.length > 0')

      //- Restaurants
      v-tab-item
      v-card.details__section.restaurants
        h3.section__title Restaurants
        //restaurant-table(:restaurants='hotel.restaurants')

        carousel(:media="restaurantsMedia" v-if='restaurantsMedia.length > 0')


        //- MEETING SPACE PART
      v-tab-item
      v-card.details__section.rooms
        h3.section__title Meeting Rooms
        meeting-rooms(v-model="hotel.meeting_rooms")
        carousel(:media="meetingRoomsMedia" v-if='meetingRoomsMedia.length > 0')

        //- Location PART
      v-tab-item
      location(v-model="hotel" v-if="hotel.map")

      //- Galery PART
    v-dialog(v-model="showGallery")
      v-btn(dark icon @click="showGallery = false")
        v-icon mdi-close
      gallery(v-model="hotel.media")
</template>

<script>
import Hotel from '@/models/Hotel'
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
        'restaurants.cuisines',
        'restaurants.type',
        'media',
        'star',
        'distances'
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
    roomTypes: function(){
      return {
        guests: this.hotel.rooms.filter(r => r.type === 0).reduce((a, b) => a+b.qty, 0),
        suites: this.hotel.rooms.filter(r => r.type === 1).reduce((a, b) => a+b.qty, 0),
        villas: this.hotel.rooms.filter(r => r.type === 2).reduce((a, b) => a+b.qty, 0)
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
    },
    largestSpace: function(){
      let areas = this.hotel.meeting_rooms.map(m => Number(m.area))
      return areas.length ? Math.max(...areas) + ' m<sup>2</sup>' : 'N/A'
    }
  },
  components: {
    RestaurantTable,
    MeetingRooms,
    Location,
    Rooms,
    Carousel,
    Gallery
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/pages/details.sass'
@import '@/assets/styles/components/hotel-stars.sass'
</style>
