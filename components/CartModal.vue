<template lang='pug'>
  v-card(color='#F6F8FB').cart-page
    v-card(color='#fff').main-card
      v-row.py-4
        v-spacer
        v-btn(icon @click="dialog = $emit('close')")
          v-icon mdi-close
      v-expansion-panels(v-model="opened" multiple)
        v-expansion-panel(v-for="(order, i) in orders" :key="i")
          v-expansion-panel-header 
            
            span {{ getProductName(order.product_id) }}: 
              v-icon(dark) mdi-airplane-takeoff
              | &nbsp; {{ getLocationName(order.from) }}
              | &mdash;&nbsp;
              v-icon(dark) mdi-airplane-landing
              | &nbsp; {{ getLocationName(order.to) }}

            v-btn.pl-10.pr-10.mr-5(@click="removeOrder(i)" small color="error") Remove
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
                      img(:src='hotel.photo').hotel-image
                      .middle-part
                        v-list-item-title
                          a(:href='`/hotel/${hotel.id}`' target='_blank' v-text='hotel.name').hotel-title
                        span(v-text='hotel.region').hotel-region

                      v-spacer

                      v-btn(icon @click='removeHotel({ order: i, hotel: index })' v-if='!$vuetify.breakpoint.xs')
                        v-icon mdi-close
                      v-btn(@click='removeHotel({ order: i, hotel: index })' v-else text color='error') Remove

              v-col(lg='3' md='4' sm='6' cols='12' offset-md='1')
                p.cart-page__title Event size
                .event-size
                  .event-size__field-group
                    span.group__name Single rooms:
                    .control.minus(@click="decr(order, 'sgl')"): v-icon mdi-minus
                    v-text-field(v-model='order.sgl' @input='recalc(order)' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click="incr(order, 'sgl')"): v-icon mdi-plus
                  .event-size__field-group
                    span.group__name Double rooms:
                    .control.plus(@click="decr(order, 'dbl')"): v-icon mdi-minus
                    v-text-field(v-model='order.dbl' @input='recalc(order)' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click="incr(order, 'dbl')"): v-icon mdi-plus
                  .event-size__field-group
                    span.group__name Triple rooms:
                    .control.plus(@click="decr(order, 'trpl')"): v-icon mdi-minus
                    v-text-field(v-model='order.trpl' @input='recalc(order)' placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click="incr(order, 'trpl')"): v-icon mdi-plus
                  .event-size__field-group
                    span.group__name Total Pax:
                    .control.plus(@click="decr(order, 'pax')"): v-icon mdi-minus
                    v-text-field(v-model='order.pax' @input="recalc(order, 'pax')" placeholder="0" solo hide-details flat).group__input
                    .control.plus(@click="incr(order, 'pax')"): v-icon mdi-plus

            v-row
              v-col(cols='12')
                p.cart-page__title Note
                v-textarea(v-model='order.note' outlined placeholder='Type your note here' hide-details)

      v-row(wrap v-if="orders.length > 0").align-center.my-8
        v-checkbox(v-model='agree' hide-details).mr-2.mb-4
          template(v-slot:label)
            div
              | I agree The information contained in this site is provided for informational purposes only,
              br/
              | and should not be construed as legal advice on any subject matter.!
        v-spacer
        .px-3
          v-btn(:disabled='!agree' color='primary' x-large @click='send').custom Send all orders

</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import pick from 'lodash.pick'

export default {
  data: () => ({
    opened: [0],
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
    ...mapActions({ 
      removeHotel: 'cart/removeHotel',
      removeOrder: 'cart/removeOrder'
    }),
    ...mapMutations({
      cleanCart: 'cart/CLEAN_CART',
      showSnackbar: 'snackbar/showSnackbar'
    }),
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
    async send() {
      //if (!this.validate()) return false
      //this.cleanCart()
      if(this.orders.length > 0){
        let orders = this.orders.map(o => {
          o.single = o.sgl
          o.double = o.dbl
          o.triple = o.trpl
          o.hotels = o.hotels.map(h => h.id)
          return o
        })

        let res = await this.$axios.post('/createorders', { orders })

        this.cleanCart()

        this.showSnackbar({
          message: 'Order has been sent',
          color: 'green'
        })
        this.$emit('close')
      }
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
    incr(order, index) {
      order[index]++
      this.recalc(order, index)
    },
    decr(order, index) {
      let value = order[index]
      if (value > 0) order[index]--
      this.recalc(order, index)
    },
    recalc(order, e) {
      if (e == 'pax') {
        order.sgl = 0
        order.dbl = order.pax > 0 ? Math.ceil(order.pax / 2) : 0
        order.trpl = 0
      } else {
        order.pax =
          Number(order.sgl) +
          Number(order.dbl * 2) +
          Number(order.trpl * 3)
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
  }
}
</script>
<style lang="sass">
  @import '@/assets/styles/components/cart.sass'
</style>
