<template lang="pug">
  v-card(elevation='8' :class='{compact }').hotels__item
    .hotel__quick-info(@click='showMenu = !showMenu')
      .hotel__image
        img(src='/img/home/ecommerce.png' alt='Hotel Image')
      .hotel__info
        h3.info__title
          hotel-stars(id='9')
          span(v-text='hotel')

        .info__regions(v-text="region")

        .info__props
          .props__room-chars
            table
              tr.props__item
                td: b Rooms: 
                td: span(v-text='total_rooms')
              tr.props__item
                td: b Meeting rooms: 
                td: span (empty)
              tr.props__item
                td: b Total Space: 
                td: span(v-text='meeting_space')
              tr.props__item
                td: b Largest Space: 
                td: span(v-text='meeting_space')

          .props__price(v-if='price')
            .props__title PP in DBL sharing room
            table
              tr.props__item
                td: b Landing: 
                td: span(v-text='price.landing + " " + curSymb')
              tr.props__item
                td: b Package: 
                td: span(v-text='price.package + " " + curSymb')
              tr.props__item
                td: b Pre Post: 
                td: span(v-text='price.prepost + " " + curSymb')

        .info__actions(:class='{compact}')
          v-btn(color='secondary' small @click.stop="$router.push(`/hotel/${id}`)").custom Details
          v-btn(color='primary' small @click.stop='addToCart(id)').custom Select Hotel

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
    amenities: Array,
    total_rooms: Number,
    restaurants: Array,
    amenities: Array,
    meeting_space: Number,
    largest_space: String,
    region: String,
    props: Array
  },
  components: { HotelStars }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/hotel-item.sass'

</style>

