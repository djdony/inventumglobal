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
              .info__regions(v-text="`${hotel.city} / ${hotel.location.name}`")
            v-btn.custom(color='primary' x-large) Select Hotel

          .content__row
            .details
              .details__block
                .block__title Chain Scales
                table.block__list
                  tbody
                    tr(v-if="hotel.chain").block-list__item
                      td.item__param Chain Scale
                        td.item__value : {{ hotel.chain.name }}
                    tr(v-if="hotel.hotelgroup").block-list__item
                      td.item__param Chain
                        td.item__value : {{ capitalize(hotel.hotelgroup.name) }}
                    tr.block-list__item
                      td.item__param Brand
                        td.item__value : {{ capitalize(hotel.name) }}

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
                      td.item__param Number of Rooms
                      td.item__value : {{ roomsQty }}
                    tr.block-list__item
                      td.item__param Guest Rooms
                      td.item__value : {{ roomTypes.guests }}
                    tr(v-if="roomTypes.suites").block-list__item
                      td.item__param Suites
                      td.item__value : {{ roomTypes.suites }}
                    tr(v-if="roomTypes.villas").block-list__item
                      td.item__param Villas
                      td.item__value : {{ roomTypes.villas }}


              .details__block
                .block__title Meetings &amp; Events
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param Meeting Rooms
                      td.item__value : {{ hotel.meeting_rooms.length }}
                    tr.block-list__item
                      td.item__param Meeting space
                      td.item__value(v-html="` : ${totalSpace}` + ' m<sup>2</sup>'")
                    tr.block-list__item
                      td.item__param Largest room
                      td.item__value(v-html="` : ${largestSpace}`")
                    tr.block-list__item
                      td.item__param Space (Outdoor)
                      td.item__value : Yes



              .details__block
                .block__title Location
                table.block__list
                  tbody
                    tr.block-list__item
                      td.item__param From {{ hotel.distance.name }}
                    tr.block-list__item
                      td.item__param Distance
                      td.item__value(v-if="hotel.hasOwnProperty('distance')")
                        | : {{ hotel.distance.pivot.distance }} km
                    tr.block-list__item
                      td.item__param Transfer time
                      td.item__value(v-if="hotel.hasOwnProperty('distance')")
                        | : {{ byCar}} minute by car


              //.details__block
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
        v-tabs(centered @change="scrollTo($event)")
          v-tab(value="gallery" style="margin-right:20px") Gallery
          v-tab(value="rooms" style="margin-right:20px") Rooms
          v-tab(value="meeting" style="margin-right:20px") Meeting rooms
          v-tab(value="restaurants" style="margin-right:20px") Restaurants
          //v-tab(value="amenities") Amenities
          v-tab(value="location") Location

            //- OVERVIEW PART
      v-card.details__section.overview
        h3.section__title Overview
        .overview__content
          p(v-html='hotel.description')


      //- Photo Gallery

      v-card(v-if='hotel.media.length > 0' ref="0").details__section.gallery
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
      v-card.details__section.rooms(ref="1")
        h3.section__title Rooms &amp; Suites
        .rooms__count
          tr.count__item
            td
              b Total Rooms
            td : {{ roomsQty }}
          tr.count__item
            td
              b Guest Rooms
            td : {{ roomTypes.guests }}
          tr(v-if="roomTypes.suites").count__item
            td
              b Suite Rooms
            td : {{ roomTypes.suites }}
          tr(v-if="roomTypes.villas").count__item
            td
              b Villas
            td : {{ roomTypes.villas }}



        rooms(v-model="hotel.rooms")

        carousel(:media="roomsMedia" v-if='roomsMedia.length > 0')




        //- MEETING SPACE PART
      v-card.details__section.rooms(ref="2")
        h3.section__title Meeting Rooms
        .rooms__count
          tr.count__item
            td
              b Total Meeting Rooms
            td : {{ hotel.meeting_rooms.length }}
          tr.count__item
            td
              b Total Meeting space
            td(v-html="` : ${totalSpace}` + ' m<sup>2</sup>'")
          tr(v-if="roomTypes.suites").count__item
            td
              b Largest Room
            td(v-html="` : ${largestSpace}`")
          tr.count__item
            td
              b Space (Outdoor)
            td : Yes
        meeting-rooms(v-model="hotel.meeting_rooms")
        carousel(:media="meetingRoomsMedia" v-if='meetingRoomsMedia.length > 0')

      //- Restaurants
      v-card.details__section.restaurants(ref="3")
        h3.section__title Restaurant & Bars
        restaurant-table(:restaurants='hotel.restaurants')

        carousel(:media="restaurantsMedia" v-if='restaurantsMedia.length > 0')

        //- Location PART
      location(v-model="hotel" v-if="hotel.map" ref="4")

      //- Galery PART
    v-dialog(v-model="showGallery" width="60%")
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
                    'chain',
                    'hotelgroup',
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
            ...mapActions({ addToCart: 'cart/addHotel' }),
            scrollTo(ref) {
                let el  = this.$refs[ref]
                let top = null
                if(el) top = el.$el.offsetTop+80
                if(top) window.scrollTo(0, top)
            },
            addToCart() {
                this.$store.dispatch('cart/addHotel', {
                    hotel: {id: this.id, name: this.name, photo: this.photo, region: this.region},
                    ...this.$route.query
                })
            },
            capitalize: function(s) {
                return s.split(" ").reduce((reducer, el, index) => {
                    return reducer + " " + el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()
                }, '')
            },

        },
        computed: {
            roomsQty: function() {
                if (this.hotel && this.hotel.hasOwnProperty('rooms')) {
                    return this.hotel.rooms.reduce((a, b) => a + b.qty, 0)
                } else {
                    return 'N/A'
                }
            },

            byCar: function() {
                return Math.ceil(this.hotel.distance.pivot.distance*1.23)
            } ,
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
            },
            totalSpace: function(){
                let areas = this.hotel.meeting_rooms.filter(m => m.parent_id === null).map(m => Number(m.area))
                return areas.reduce(function (a, b) {
                    return a + b
                }, 0);
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
