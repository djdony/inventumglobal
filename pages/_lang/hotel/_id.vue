<template lang='pug'>
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
                .block__title Chain Scales
                .block__list
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                    
              .details__block
                .block__title Physical Features 
                .block__list
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                    
              .details__block
                .block__title Rooms &amp; Suites
                .block__list
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic

              .details__block
                .block__title Meetings &amp; Events
                .block__list
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic

              .details__block
                .block__title Location 
                .block__list
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic

              .details__block
                .block__title Distance 
                .block__list
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic
                  .block-list__item
                    span.item__param Chain Scale: 
                    span.item__value Titanic

      //- OVERVIEW PART

      v-card.details__section.overview
        h3.section__title Overview
        .overview__content
          p Situated on the shores of the Turkish Riviera, Titanic Mardan Palace is one of the most luxurious all inclusive resorts in the Mediterranean. 
          p A total of 543 rooms and suites has been designed and appointed to the most luxurious standards, each with spectacular views of nature and palatial architecture.A total of 543 rooms and suites has been designed and appointed to the most luxurious standards, each with spectacular views of nature and palatial architecture.

      //- OVERVIEW PART

      v-card.details__section.gallery
        h3.section__title Photo Gallery
        .images-wrapper
          v-img(src='/img/details/banner.png' aspect-ratio='1')
          v-img(src='/img/details/banner.png' aspect-ratio='1')
          v-img(src='/img/details/banner.png' aspect-ratio='1')
          v-img(src='/img/details/banner.png' aspect-ratio='1')
          v-img(src='/img/details/banner.png' aspect-ratio='1')

      //- ROOMS PART

      v-card.details__section.rooms
        h3.section__title Rooms &amp; Suites
        .rooms__count
          .count__item
            b Number of rooms: 
            span {{ roomsQty }}

        rooms(v-model="hotel.rooms")
              
        rooms-carousel(:items='[]')

        //- MEETING SPACE PART

      v-card.details__section.restaurants
        h3.section__title Restaurants
        restaurant-table(:restaurants='hotel.restaurants')

        //- MEETING SPACE PART
      v-card.details__section.meeting-space
        h3.section__title Meeting space
        .meeting-space__count
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
      location
</template>

<script>
import Hotel from '@/models/Hotel'
import HotelStars from '@/components/HotelStars'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import MeetingRooms from '@/components/MeetingRoom'
import Location from '@/components/Location'
import Rooms from '@/components/Rooms'
import RestaurantTable from '@/components/Restaurant'
import RoomsCarousel from '@/components/RoomsCarousel'

export default {
  data() {
    return {
      
    }
  },
  async asyncData({ route }) {
    try {
      let hotel = await Hotel.include([
        'rooms',
        'rooms.room_type',
        'location',
        'types',
        'meeting_rooms',
        'restaurants'
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
    roomsQty: function(){
      if(this.hotel && this.hotel.hasOwnProperty('rooms')){
        return this.hotel.rooms.reduce((a, b) => a+b.qty, 0)
      }else{
        return 'N/A'
      }
    }
  },
  components: {
    RestaurantTable,
    MeetingRooms,
    HotelStars,
    Location,
    Rooms,
    RoomsCarousel
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/pages/details.sass'

</style>
