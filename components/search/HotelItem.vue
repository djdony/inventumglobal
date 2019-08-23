<template lang="pug">
  v-card(elevation='8' :class='{compact }').hotels__item
    .hotel__quick-info(@click='showDetails')
      .hotel__image
        img(:src="photo" alt='Hotel Image')
      .hotel__info
        h3.info__title
          hotel-stars(id='9')
          span(v-text='name') 

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
          v-btn(color='primary' small @click.stop='addToCart($props)').custom Select Hotel

        //- v-btn(v-else color='secondary').custom.full-width.mt-3 Select hotel

    transition(name='hotelInfoFade')
      .hotel__more-info(v-if='!compact && showMenu')
        v-tabs
          v-tab General
          v-tab Rooms
          v-tab Meeting rooms
          v-tab Restaurants
          v-tab Amenities

          //- General
          v-tab-item
            v-card(elevation='0').tab-item.general-tab 
              .images-wrapper 
                v-img(
                  v-for="m in hotel.media"
                  :src='m.url'
                  :key="m.id"
                  :aspect-ratio="1"
                  @click="showGallery = true"
                )
              .general-info(v-html="hotel.description")

          //- Rooms
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table(fixed-header dense)
                thead
                  tr
                    th Type
                    th Area, m²
                    th Quantity
                tbody
                  tr(v-for="r in rooms" :key="r.id")
                    td(v-text="r.room_type.name")
                    td(v-text="r.min_area")
                    td(v-text="r.qty")

          //- Meeting rooms
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table(fixed-header dense)
                thead
                  tr
                    th Name
                    th Area, m2
                    th Length, m
                    th Width, m
                    th Height, m
                    th Gala, pax
                    th Cocktail, pax
                    th Theater, pax
                    th Classroom, pax
                    th U-shape, pax
                    th Boardroom, pax
                tbody
                  tr(v-for="m in hotel.meeting_rooms" :key="m.id")
                    td(v-text="m.name")
                    td(v-text="m.area")
                    td(v-text="m.length")
                    td(v-text="m.width")
                    td(v-text="m.height")
                    td(v-text="m.banquet")
                    td(v-text="m.cocktail")
                    td(v-text="m.theater")
                    td(v-text="m.classroom")
                    td(v-text="m.ushape")
                    td(v-text="m.boardroom")

          //- Restaurants
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table(fixed-header dense)
                thead
                  tr
                    th Name
                    th Food Included
                    th Drinks Included
                    th Type
                tbody
                  tr(v-for="rst in hotel.restaurants" :key="rst.id")
                    td(v-text="rst.name")
                    td(v-text="rst.food ? 'Included' : 'Extra'")
                    td(v-text="rst.drinks  ? 'Included' : 'Extra'")
                    td(v-text="rst.type_id")

          //- Amenities
          v-tab-item
            v-card(elevation='0').tab-item.table
              v-simple-table(fixed-header dense)
                thead
                  tr
                    th Name
                    th Type
                tbody
                  tr(v-for="a in hotel.amenities" :key="a.id")
                    td(v-text="a.name")
                    td(v-text="a.type")
    v-dialog(v-model="showGallery")
      v-btn(dark icon @click="showGallery = false")
        v-icon mdi-close
      gallery(v-model="hotel.media")
</template>
<script>
import { mapActions } from 'vuex'
import HotelStars from '@/components/HotelStars'
import Gallery from '@/components/Gallery'
import Hotel from '@/models/Hotel'

export default {
  data() {
    return {
      showMenu: false,
      showGallery: false,
      hotel: new Hotel({
        media: [],
        meeting_rooms: [],
        rooms: [],
        restaurants: [],
        amenities: []
      })
    }
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addHotel' }),
    async showDetails(){
      this.showMenu = !this.showMenu
      if(this.showMenu){
        this.hotel = await Hotel.include(
          'media', 
          'meeting_rooms', 
          'rooms', 
          'rooms.room_type', 
          'restaurants', 
          'amenities'
        ).find(this.id)
      }else{
        this.hotel = new Hotel({
          media: [],
          meeting_rooms: [],
          rooms: [],
          restaurants: [],
          amenities: []
        })
      }
    }
  },
  computed: {
    rooms(){
      return this.hotel.rooms.sort((a, b) => {
        if (a.qty < b.qty) {
          return 1;
        }
        if (a.qty > b.qty) {
          return -1;
        }
        return 0;
      })
    },
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
    name: String,
    stars: String,
    amenities: Array,
    total_rooms: Number,
    restaurants: Array,
    meeting_space: Number,
    largest_space: Number,
    region: String,
    props: Array,
    photo: String 
  },
  components: { HotelStars, Gallery }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/hotel-item.sass'

</style>

