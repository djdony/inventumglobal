<template lang="pug">
  v-card(elevation='8' :class='{compact }').hotels__item
    .hotel__quick-info(@click="$emit('show-details', id, !showMenu)")
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
                td: span
              tr.props__item
                td: b Total Space: 
                td: span(v-text='meeting_space + " m2"')
              tr.props__item
                td: b Largest Space: 
                td: span(v-text='largest_space + " m2"')

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
          v-btn.custom(color='secondary' small @click.stop="$router.push(`/hotel/${id}`)") Details
          v-btn.custom(color='primary' small @click.stop="addToCart") Select Hotel

        //- v-btn(v-else color='secondary').custom.full-width.mt-3 Select hotel

    transition(name='hotelInfoFade')
      .hotel__more-info(v-if='!compact && showMenu')
        v-tabs
          v-tab General
          v-tab Rooms
          v-tab Meeting rooms
          v-tab Restaurants
          v-tab Amenities
          v-tab Location

          //- General
          v-tab-item
            v-card(elevation='0').tab-item.general-tab
              .images-wrapper(v-if='hotel.media.length > 0')
                v-img(
                  v-for="m in hotel.media.slice(0, 6)"
                  :src='m.url'
                  :key="m.id"
                  :aspect-ratio="1"
                  @click="showGallery = true"
                )

              .general-info(v-html="hotel.description")

          //- Rooms
          v-tab-item
            v-card(elevation='0').tab-item.general-tab
              rooms(v-model="hotel.rooms")

          //- Meeting rooms
          v-tab-item
            v-card(elevation='0').tab-item.general-tab
              meeting-room(v-model="hotel.meeting_rooms" :excludeColumns="['boardroom','length','width']")

          //- Restaurants
          v-tab-item
            v-card(elevation='0').tab-item.general-tab
              //restaurant(:restaurants='hotel.restaurants')

          //- Amenities
          v-tab-item
            v-card(elevation='0').tab-item.general-tab
              amenities(:amenities='hotel.amenities')

            //- Location
          v-tab-item
            v-card(elevation='0').tab-item.table
              location(v-model="hotel" tab-mode)
    v-dialog(v-model="showGallery")
      v-btn(dark icon @click="showGallery = false")
        v-icon mdi-close
      gallery(v-model="hotel.media")
</template>
<script>
import HotelStars from '@/components/HotelStars'
import Gallery from '@/components/Gallery'
import Hotel from '@/models/Hotel'
import Restaurant from '@/components/Restaurant'
import Rooms from '@/components/Rooms'
import MeetingRoom from '@/components/MeetingRoom'
import Location from '@/components/Location'
import Amenities from '@/components/Amenities'

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
        amenities: [],
        excludeColumns: ['boardroom']
      })
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('cart/addHotel', {
        hotel: { id: this.id, name: this.name },
        ...this.$route.query
      })
    },
    async showDetails() {
      try {
        this.showMenu = !this.showMenu
        if (this.showMenu) {
          this.hotel = await Hotel.include(
            'media',
            'meeting_rooms',
            'rooms',
            'rooms.room_type',
            'restaurants',
            'amenities'
          ).find(this.id)
        } else {
          this.hotel = new Hotel({
            media: [],
            meeting_rooms: [],
            rooms: [],
            restaurants: [],
            amenities: []
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    rooms() {
      return this.hotel.rooms.sort((a, b) => {
        if (a.qty < b.qty) {
          return 1
        }
        if (a.qty > b.qty) {
          return -1
        }
        return 0
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
    photo: String,
    details: {
      type: Boolean,
      default: false
    }
  },
  components: { HotelStars, Gallery, Restaurant, Rooms, MeetingRoom, Location, Amenities },
  watch: {
    details: {
      handler: function(val) {
        this.showDetails()
      }
    }
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/hotel-item.sass'

</style>

