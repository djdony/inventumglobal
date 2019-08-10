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
                .info__stars
                  span.stars__value 5
                  v-icon mdi-star
                span(v-text='hotel.name')

              .info__regions Turkey / Antalya / Aksu 

            v-btn(color='primary' x-large).custom Select hotel

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

        .rooms__table
          v-simple-table
            thead
              th Room type
              th Number
              th Size
              th Occupancy
            tbody
              tr
                td Standart room
                td 10
                td 100 m²
                td 200
              
        .rooms__carousel
          owl-carousel(:items='roomsCarouselItems' :margin='20' :nav='false' :dots='false')
            template(slot="prev")
              v-btn(icon elevation='24').prev: v-icon mdi-chevron-left
            template(slot="next")
              v-btn(icon elevation='24').next: v-icon mdi-chevron-right

            img(src='/img/details/banner.png')
            img(src='/img/details/banner.png')
            img(src='/img/details/banner.png')
            img(src='/img/details/banner.png')
            img(src='/img/details/banner.png')
            img(src='/img/details/banner.png')

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
            
        .meeting-space__table
          v-simple-table
            thead.icons
              th 
              th: v-icon mdi-image-size-select-small
              th: v-icon mdi-human-male-height-variant
              th: v-icon mdi-tape-measure
              th: v-icon mdi-alpha-u-circle
              th: v-icon mdi-gamepad-circle-outline
              th: v-icon mdi-glass-cocktail
              th: v-icon mdi-theater
              th: v-icon mdi-google-classroom
              th: v-icon mdi-account-group
              th: v-icon mdi-vector-circle
              th: v-icon mdi-square-outline
            thead
              th Meeting Room
              th Room size
              th Ceiling  height
              th Room dimensions
              th U-shape
              th Banquet rounds
              th Cocktail rounds
              th Theater
              th Classroom
              th Boardroom
              th Crescent rounds (Cabaret)
              th Hollow square
            tbody
              tr
                td Rooms name
                td 48 m²
                td 2.9 m
                td 24 m x 22.4 m
                td 16
                td 60
                td 90
                td 45
                td 30
                td 24
                td 85
                td 7

      //- LOCATION PART

      v-card.details__section.location
        h3.section__title Location
        p.location__name Özlü Mah. Tesisler Cad. No 450, Aksu, Antalya, 07710, Turkey
        .location__map-wrapper
          iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112996.20297449981!2d30.830003278360913!3d36.868956792332014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c382a28b7af6fb%3A0x49c233c8eeec9edb!2sTesisler+Cd+No%3A450!5e0!3m2!1sru!2sru!4v1565431337281!5m2!1sru!2sru" frameborder="0" style="border:0" allowfullscreen)





      
</template>

<script>
import OwlCarousel from 'vue-owl-carousel'
import Hotel from '@/models/Hotel'

export default {
  data() {
    return {}
  },
  async asyncData(context) {
    try {
      let hotel = await Hotel.where('id', context.route.params.id)
        .include('seasons', 'periods', 'rooms', 'location', 'types')
        .get()

      console.log(hotel)

      return { hotel: hotel[0] }
    } catch ({ response }) {
      // this.$message.error(response.data.message)
      console.log(response)
    }
  },
  created() {},
  methods: {},
  computed: {
    roomsCarouselItems() {
      let { breakpoint } = this.$vuetify

      if (breakpoint.xs) return 1
      if (breakpoint.sm) return 2
      if (breakpoint.md) return 3

      return 4
    }
  },
  components: { OwlCarousel }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/pages/details.sass'

</style>
