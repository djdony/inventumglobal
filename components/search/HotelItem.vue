<template lang="pug">
  v-card(elevation='8' :class='{compact }').hotels__item
    .hotel__quick-info(@click='showMenu = !showMenu')
      .hotel__image
        img(src='/img/home/ecommerce.png' alt='Hotel Image')
      .hotel__info
        h3.info__title
<<<<<<< HEAD
          hotel-stars(id='9')
=======
          .info__stars
            span.stars__value(v-text='stars')
            v-icon mdi-star
>>>>>>> 2e1742cafd6e029d1a9842b97b62fe3eac4d91ad
          span(v-text='hotel')

        .info__regions Region

        .info__props
          .props__room-chars
            .props__item
              b Rooms:
              span(v-text='total_rooms')
            .props__item
              b Meeting rooms:
            span
            .props__item
              b Total Space:
              span(v-text='meeting_space')
            .props__item
              b Largest Space:
              span(v-text='meeting_space')
          .props__price(v-if='price')
            .props__title PP in DBL sharing room
            .props__item
              b Landing: 
              span(v-text='price.landing + " " + curSymb')
            .props__item
              b Package: 
              span(v-text='price.package + " " + curSymb')
            .props__item
              b Pre Post: 
              span(v-text='price.prepost + " " + curSymb')

        .info__actions(:class='{compact}')
<<<<<<< HEAD
          v-btn(color='secondary' small @click.stop="$router.push(`/hotel/${id}`)").custom Quick View
          v-btn(color='primary' small @click.stop='addToCart(id)').custom Select Hotel
=======
          v-btn(color='secondary' small @click.stop="$router.push(`/hotel/${id}`)").custom Details
          v-btn(color='primary' small).custom Select Hotel
>>>>>>> 2e1742cafd6e029d1a9842b97b62fe3eac4d91ad

        //- v-btn(v-else color='secondary').custom.full-width.mt-3 Select hotel

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
import { mapActions } from 'vuex'
import HotelStars from '@/components/HotelStars'

export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addHotel' })
  },
  computed: {
    curSymb() {
      switch (this.price.currency) {
        case 'EUR':
          return '€'
          break
        case 'USD':
          return '$'
          break
        case 'RUB':
          return '₽'
          break
        default:
          return '€'
          break
      }
    }
  },
  props: {
    id: Number,
    compact: {
      type: Boolean,
      default: false
    },
    price: Object,
    image: String,
    hotel: String,
    stars: String,
    amenities: Object,
    total_rooms: String,
    restaurants: String,
    amenities: String,
    meeting_space: String,
    largest_space: String,
    regions: Array,
    props: Array
  },
  components: { HotelStars }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/hotel-item.sass'

</style>

