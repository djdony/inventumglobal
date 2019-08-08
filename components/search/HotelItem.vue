<template lang="pug">
  v-card(elevation='8' :class='{compact }').hotels__item
    .hotel__quick-info(@click='showMenu = !showMenu')
      .hotel__image
        img(src='/img/home/ecommerce.png' alt='Hotel Image')
      .hotel__info
        h3(v-text='title').info__title

        .info__reviews
          .reviews__stars
            v-icon(color='primary' v-for='i in stars' :key='i') mdi-star
          span(v-text='regions.join(" / ")').reviews__regions

        .info__props
          .props__item(v-for='(prop, index) in props' :key='index')
            b(v-text='prop[0] + ": "')
            span(v-text='prop[1]')

        .info__price(v-if='!compact')
          span.price__title Starting from: 
          span(v-text='price + " €"').price__value

        v-btn(v-else color='secondary').custom.full-width.mt-3 Select hotel

    transition(name='hotelInfoFade')
      .hotel__more-info(v-if='!compact && showMenu')
        v-tabs()
          v-tab General
          v-tab Rooms
          v-tab Meeting rooms
          v-tab Restaurants
          v-tab Amenities

          //- General
          v-tab-item
            v-card(elevation='0').tab-item.general-tab 
              .images-wrapper 
                v-img(src='/img/home/ecommerce.png' alt='Hotel Image' aspect-ratio='1')
                v-img(src='/img/home/ecommerce.png' alt='Hotel Image' aspect-ratio='1')
                v-img(src='/img/home/ecommerce.png' alt='Hotel Image' aspect-ratio='1')
                v-img(src='/img/home/ecommerce.png' alt='Hotel Image' aspect-ratio='1')
                v-img(src='/img/home/ecommerce.png' alt='Hotel Image' aspect-ratio='1')
                v-img(src='/img/home/ecommerce.png' alt='Hotel Image' aspect-ratio='1')
              .general-info
                p Good business hotel. Close to Starbucks. Good for sightseeing and close to the city center. Friendly atmosphere and good hotel grounds. Great valet service. Popular among families.
                p Good business hotel.

          //- Rooms
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table
                thead
                  tr
                    th Type
                    th Area, m²
                    th Quantity
                tbody
                  tr
                    td Junior Suite
                    td 40
                    td 8
                  tr
                    td Junior Suite
                    td 40
                    td 8

          //- Meeting rooms
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table
                thead
                  tr
                    th Type
                    th Length, m
                    th Width, m
                    th Height, m
                    th Cocktail, pax
                    th Theater, pax
                    th Classroom, pax
                    th U-shape, pax
                    th Broadroom, pax
                tbody
                  tr
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                  tr
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example
                    td Example

          //- Restaurants
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table
                thead
                  tr
                    th Name
                    th Status
                tbody
                  tr
                    td Restaurant
                    td ...

          //- Amenities
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table
                thead
                  tr
                    th Name
                    th Status
                tbody
                  tr
                    td Balkon
                    td Inlcuded
                  tr
                    td Balkon
                    td Inlcuded
                  tr
                    td Balkon
                    td Inlcuded
                


          
           

                
</template>
<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    image: String,
    title: String,
    stars: Number,
    regions: Array,
    props: Array,
    price: String
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/hotel-item.sass'

</style>

