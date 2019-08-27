<template lang='pug'>
  v-card(color='#F6F8FB').cart-page
    v-card(color='#fff').main-card
      v-row.py-4
        v-spacer
        v-btn(icon @click="dialog = $emit('close')")
          v-icon mdi-close
      v-expansion-panels(:value='[0]' multiple)
        v-expansion-panel(v-for="(order, i) in orders" :key="i")
          v-expansion-panel-header 
            v-btn(icon @click="removeOrder")
                v-icon mdi-close
            span {{ getProductName(order.product_id) }}: 
              v-icon(dark) mdi-airplane-takeoff
              | &nbsp; {{ getLocationName(order.from) }}
              | &mdash;&nbsp;
              v-icon(dark) mdi-airplane-landing
              | &nbsp; {{ getLocationName(order.to) }}
          v-expansion-panel-content
            v-row.mt-4
              v-col(md='7' lg="8" cols='12')
                v-layout.dates
                  p.cart-page__title 
                    v-icon.mr-2 mdi-calendar
                    span DATES:
                  .dates-row
                    .date(v-text='formattedDate(order.departure_date)')
                    span TO
                    .date(v-text='formattedDate(order.arrival_date)')
                .hotels-list.mt-6
                  .empty(v-if='loaded && order.hotels.length == 0') No hotels
                  v-card(:loading='!loaded' elevation='0')
                    v-list-item(v-for='(hotel, index) in order.hotels' :key='index' )
                      span.hotel-numering(v-text='index+1')
                      img(src='/img/home/ecommerce.png').hotel-image
                      .middle-part
                        v-list-item-title
                          a(:href='`/hotel/${hotel.id}`' target='_blank' v-text='hotel.name').hotel-title
                        span(v-text='hotel.region').hotel-region

                      v-spacer

                      v-btn(icon @click='removeHotel(i, index)' v-if='!$vuetify.breakpoint.xs')
                        v-icon mdi-close
                      v-btn(@click='removeHotel(i, index)' v-else text color='error') Remove

              v-col(lg='3' md='4' sm='6' cols='12' offset-md='1')
                p.cart-page__title Event size
                .event-size
                  .event-size__field-group
                    span.group__name Single rooms:
                    .control.plus(@click='decr("single")'): v-icon mdi-minus
                    v-text-field(v-model='order.single' @input='recalc()' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click='incr("single")'): v-icon mdi-plus
                  .event-size__field-group
                    span.group__name Double rooms:
                    .control.plus(@click='decr("double")'): v-icon mdi-minus
                    v-text-field(v-model='order.double' @input='recalc()' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click='incr("double")'): v-icon mdi-plus
                  .event-size__field-group
                    span.group__name Triple rooms:
                    .control.plus(@click='decr("triple")'): v-icon mdi-minus
                    v-text-field(v-model='order.triple' @input='recalc()' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click='incr("triple")'): v-icon mdi-plus
                  .event-size__field-group
                    span.group__name Total Pax:
                    .control.plus(@click='decr("pax")'): v-icon mdi-minus
                    v-text-field(v-model='order.pax' @input='recalc(`pax`)' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click='incr("pax")'): v-icon mdi-plus

            v-row
              v-col(cols='12')
                p.cart-page__title Note
                v-textarea(v-model='order.note' outlined placeholder='Type your note here' hide-details)

      v-row(wrap).align-center.justify-end.my-8
        v-checkbox(v-model='agree' label='I agree that...' hide-details).mr-2.mb-4
        .px-3
          v-btn(color='primary' x-large @click='send').custom Send all orders

</template>
<script>
import HotelStars from '@/components/HotelStars'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import pick from 'lodash.pick'

export default {
  data: () => ({
    orders: [],
    agree: false,
    menu1: false,
    menu2: false,
    loaded: false
  }),
  async created() {
    this.orders = this.$store.state.cart.orders
    this.loaded = true
  },
  methods: {
    ...mapActions({ removeHotel: 'cart/removeHotel' }),
    ...mapMutations({
      cleanCart: 'cart/CLEAN_CART',
      showSnackbar: 'snackbar/showSnackbar'
    }),
    removeOrder(i) {
      // remove order
    },
    formattedDate(date) {
      return this.$dayjs(date).format('DD/MM/YYYY')
    },
    getLocationName(id){
      let location = (this.fromLocationsList.concat(this.toLocationsList)).find(l => l.value == id)
      return location ? location.text : 'N/A'
    },
    getProductName(id){
      let product = this.$store.state.filters.products.find(p => p.id == id)
      return product ? product.name : 'N/A'
    },
    send() {
      if (!this.validate()) return false
      this.cleanCart()
      this.showSnackbar({
        message: 'Order has been sent',
        color: 'green'
      })
      this.$emit('close')
    },
    validate() {
      let datesDiff = this.$dayjs(this.form.arrival_date).diff(
        this.$dayjs(this.form.departure_date),
        'days'
      )

      if (datesDiff < 1) {
        return this.showSnackbar({
          message: `Arrival date must be later than departure date`,
          color: 'red'
        })
      }

      if (datesDiff > 3) {
        return this.showSnackbar({
          message: `Possible trip duration: 1-3 days (now: ${datesDiff})`,
          color: 'red'
        })
      }

      return true
    },
    removeHotel(order, hotel) {
      this.removeHotel({ order, hotel })
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
        this.form.single = 0
        this.form.double = this.form.pax > 0 ? Math.ceil(this.form.pax / 2) : 0
        this.form.triple = 0
      } else {
        this.form.pax =
          Number(this.form.single) +
          Number(this.form.double * 2) +
          Number(this.form.triple * 3)
      }
    }
  },
  computed: {
    ...mapGetters({
      fromLocationsList: 'filters/fromLocationsList',
      toLocationsList: 'filters/toLocationsList'
    })
  },
  components: {
    HotelStars
  }
}
</script>
<style lang="sass">
  @import '@/assets/styles/components/cart.sass'
</style>
