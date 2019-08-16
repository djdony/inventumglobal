<template lang='pug'>
  v-card(color='#F6F8FB').cart-page
    v-card(color='#fff').main-card
      h1.display-2.font-weight-bold Order: new

      v-row.mt-8
        v-col(md='7' cols='12')
          p.cart-page__title Dates
          .dates-row
            v-menu(v-model="menu1" :close-on-content-click="false" full-width max-width="290")
              template(v-slot:activator="{ on }")
                v-text-field(:value="formattedDateIn" hide-details outlined clearable label="Check in" readonly v-on="on")
              v-date-picker(v-model="form.departure_date" @change="menu1 = false" no-title :events='[form.arrival_date]' event-color='#3273C2' :show-current='false') 

            v-menu(v-model="menu2" :close-on-content-click="false" full-width max-width="290")
              template(v-slot:activator="{ on }")
                v-text-field(:value="formattedDateOut" hide-details outlined clearable label="Check out" readonly v-on="on")
              v-date-picker(v-model="form.arrival_date" @change="menu2 = false" no-title :events='[form.departure_date]' event-color='#3273C2' :show-current='false')

          p.cart-page__title.mt-4 Locations
          .locations
            .locations__item
              v-icon.locations-item__icon mdi-airplane-takeoff
              span.locations-item__name(v-text='form.from.name')
            .locations__item
              v-icon.locations-item__icon mdi-airplane-landing
              span.locations-item__name(v-text='form.to.name')


        v-col(lg='3' md='4' sm='6' cols='12' offset-md='1')
          p.cart-page__title Event size
          .event-size
            .event-size__field-group
              span.group__name Single rooms:
              .control.plus(@click='decr("sgl")'): v-icon mdi-minus
              v-text-field(v-model='form.sgl' @input='recalc()' placeholder="0" solo hide-details flat).group__input
              .control.plus(@click='incr("sgl")'): v-icon mdi-plus
            .event-size__field-group
              span.group__name Double rooms:
              .control.plus(@click='decr("dbl")'): v-icon mdi-minus
              v-text-field(v-model='form.dbl' @input='recalc()' placeholder="0" solo hide-details flat).group__input
              .control.plus(@click='incr("dbl")'): v-icon mdi-plus
            .event-size__field-group
              span.group__name Triple rooms:
              .control.plus(@click='decr("trp")'): v-icon mdi-minus
              v-text-field(v-model='form.trp' @input='recalc()' placeholder="0" solo hide-details flat).group__input
              .control.plus(@click='incr("trp")'): v-icon mdi-plus
            .event-size__field-group
              span.group__name Total Pax:
              .control.plus(@click='decr("pax")'): v-icon mdi-minus
              v-text-field(v-model='form.pax' @input='recalc(`pax`)' placeholder="0" solo hide-details flat).group__input
              .control.plus(@click='incr("pax")'): v-icon mdi-plus
        

      v-row.mt-8
        v-col(cols='12').hotels-list
          p.cart-page__title Hotels
          v-list-item(v-for='(hotel, index) in form.hotels' :key='index')
            span.hotel-numering(v-text='index+1')
            img(src='/img/home/ecommerce.png').hotel-image
            .middle-part
              v-list-item-title
                .hotel-stars
                  span.stars__value 5
                  v-icon mdi-star
                a(:href='`/hotel/${hotel.id}`' target='_blank' v-text='hotel.name').hotel-title
              span.hotel-region ANTALYA
            v-spacer
            .hotel-pricing
              v-radio-group(v-model="form.hotels[index].priceType" hide-details)
                v-radio(value="mice" label="M.I.C.E")
                v-radio(value="wedding" label="Wedding")
            v-btn(icon @click='removeHotel(index)' v-if='!$vuetify.breakpoint.xs')
              v-icon mdi-close
            v-btn(@click='removeHotel(index)' v-else text color='error') Remove

      v-row.mt-8
        v-col(lg='6' md='6' cols='12')
          p.cart-page__title Note
          v-textarea(v-model='form.agency_note' outlined placeholder='Type your note here' hide-details)

      v-row
        v-col
          v-checkbox(v-model='agree' label='I agree that...')

      v-row
        v-col
          v-btn(color='primary' x-large).custom Send order



</template>

<script>
import Hotel from '@/models/Hotel'

export default {
  data: () => ({
    form: {
      from: {
        name: 'Russia, Town',
        id: 2
      },
      to: {
        name: 'Russia, Moscow',
        id: 1
      },
      departure_date: new Date().toISOString().substr(0, 10),
      arrival_date: new Date().toISOString().substr(0, 10),
      hotels: [
        {
          name: 'ASTERIA KREMLIN PALACE',
          id: 1,
          priceType: 'mice'
        },
        {
          name: 'ASTERIA KREMLIN PALACE 2',
          id: 2,
          priceType: 'mice'
        }
      ],
      sgl: 0,
      dbl: 0,
      trp: 0,
      pax: 0,
      agency_note: ''
    },
    agree: false,
    menu1: false,
    menu2: false
  }),
  async created() {
    console.log(await this.getHotel(1))
  },

  computed: {
    formattedDateIn() {
      return this.form.departure_date
        ? this.$dayjs(this.form.departure_date).format('dddd, MMMM D, YYYY')
        : ''
    },
    formattedDateOut() {
      return this.form.arrival_date
        ? this.$dayjs(this.form.arrival_date).format('dddd, MMMM D, YYYY')
        : ''
    }
  },
  methods: {
    async getHotel(id) {
      try {
        let hotel = await Hotel.where('id', id)
          .include('location')
          .get()

        return { hotel: hotel[0] }
      } catch ({ response }) {
        console.log(response.data.message)
        this.$toast.error('An rror occured while loading the data')
      }
    },
    removeHotel(index) {
      this.form.hotels.splice(index, 1)
    },
    incr(index) {
      this.form[index]++
      this.recalc(index)
    },
    decr(index) {
      let value = this.form[index]
      if (value > 0) this.form[index]--
      this.recalc(index)
    },
    recalc(e) {
      if (e == 'pax') {
        this.form.sgl = 0
        this.form.dbl = this.form.pax > 0 ? Math.ceil(this.form.pax / 2) : 0
        this.form.trp = 0
      } else {
        this.form.pax =
          Number(this.form.sgl) +
          Number(this.form.dbl * 2) +
          Number(this.form.trp * 3)
      }
    }
  }
}
</script>
<style lang="sass">
  @import '@/assets/styles/components/cart.sass'
</style>
