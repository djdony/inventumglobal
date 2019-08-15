<template lang='pug'>
  v-content.cart-page
    v-container
      v-card.main-card
        h1.display-2.font-weight-bold Order: new

        p.cart-page__title.mt-10 Dates
        v-row
          v-col(lg='3' md='4' cols='12')
            v-menu(v-model="menu1" :close-on-content-click="false" full-width max-width="290")
              template(v-slot:activator="{ on }")
                v-text-field(:value="formattedDateIn" hide-details outlined clearable label="Check in" readonly v-on="on")
              v-date-picker(v-model="form.departure_date" @change="menu1 = false" no-title :events='[form.arrival_date]' event-color='#3273C2' :show-current='false') 
          v-col(lg='3' md='4' cols='12')
            v-menu(v-model="menu2" :close-on-content-click="false" full-width max-width="290")
              template(v-slot:activator="{ on }")
                v-text-field(:value="formattedDateOut" hide-details outlined clearable label="Check out" readonly v-on="on")
              v-date-picker(v-model="form.arrival_date" @change="menu2 = false" no-title :events='[form.departure_date]' event-color='#3273C2' :show-current='false')

        v-row.mt-8
          v-col(lg='3' md='4' cols='12')
            p.cart-page__title Event size
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

          v-col(lg='3' md='3' offset-md='1' cols=12)
            p.cart-page__title Pricing
            v-radio-group(v-model="form.priceType" hide-details)
              v-radio(value="mice" label="M.I.C.E")
              v-radio(value="wedding" label="Wedding")

        v-row.mt-8
          v-col(lg='6' md='6' cols='12').hotels-list
            p.cart-page__title Hotels
            v-list-item(v-for='(hotel, index) in form.hotels' :key='index')
              v-list-item-title
                span.hotel-title(v-text='hotel.name')
                a(:href='`/hotel/${hotel.id}`' target='_blank').link Open
              v-btn(icon @click='removeHotel(index)')
                v-icon mdi-close

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
export default {
  data: () => ({
    form: {
      departure_date: new Date().toISOString().substr(0, 10),
      arrival_date: new Date().toISOString().substr(0, 10),
      priceType: 'mice',
      hotels: [
        {
          name: 'ASTERIA KREMLIN PALACE',
          id: 1
        },
        {
          name: 'ASTERIA KREMLIN PALACE 2',
          id: 2
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
  created() {},

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
  @import '@/assets/styles/pages/cart.sass'
</style>
