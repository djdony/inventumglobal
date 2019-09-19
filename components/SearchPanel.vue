<template lang="pug">
div
  .search-panel
    .search-group
      .search-item.text 
        v-icon mdi-airplane-takeoff
        v-autocomplete(v-model='filters.from' :items="fromLocationsList" placeholder='From' solo flat hide-details)
        //- v-icon mdi-chevron-right

      .search-item.text 
        v-icon mdi-airplane-landing
        v-autocomplete(v-model='filters.to' :items="toLocationsList" placeholder='To' solo flat hide-details)
        //- v-icon mdi-chevron-right
        
      v-select(outlined :items='filtersData.products' item-value='id' item-text='name' v-model='filters.product_id' hide-details placeholder='Category' :menu-props='{offsetY:true}' color='secondary').select-category
     

    .search-group
      v-menu(offset-y v-model="dateMenu" transition="scale-transition"  :close-on-content-click="false")
          template(v-slot:activator="{ on }")
            v-btn.search-item.button(v-on='on')
              .text
                span.label Dates
                span(v-text='travelRange').value
              v-icon mdi-calendar-multiple
          v-card(color='white secondary--text').datepicker-menu
            //- v-date-picker(v-model="filters.departure_date" no-title width='256' first-day-of-week='1')
            v-date-picker(v-model="filters.dates" no-title width='256' first-day-of-week='1' multiple :allowed-dates='allowedDates' :min="filtersData.minDate" :max="filtersData.maxDate" :show-current='false' :events='datesInRange' event-color='#3273C2').range
              v-spacer
              span(v-text='dateMessage[filters.dates.length]' v-if='filters.dates.length < 2').primary--text.caption.px-2.pb-1
              v-btn(text color="primary" @click="dateMenu = false" v-else) OK
      
      v-menu(offset-y v-model="eventSizeMenu" content-class='white' transition="scale-transition"  :close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.search-item.button(v-on='on')
            .text
              span.label Event size
              span(v-text='filters.pax').value
            v-icon mdi-human-male
        v-card(elevation='0').search-menu.white.secondary--text
          p.search-menu__title Event size
          .search-menu__field-group
            span.group__name Single rooms:
            .control.plus(@click='decr("sgl")'): v-icon mdi-minus
            v-text-field(v-model='filters.sgl' @input='recalc()' placeholder="0" solo hide-details flat).group__input
            .control.plus(@click='incr("sgl")'): v-icon mdi-plus
          .search-menu__field-group
            span.group__name Double rooms:
            .control.plus(@click='decr("dbl")'): v-icon mdi-minus
            v-text-field(v-model='filters.dbl' @input='recalc()' placeholder="0" solo hide-details flat).group__input
            .control.plus(@click='incr("dbl")'): v-icon mdi-plus
          .search-menu__field-group
            span.group__name Triple rooms:
            .control.plus(@click='decr("trpl")'): v-icon mdi-minus
            v-text-field(v-model='filters.trpl' @input='recalc()' placeholder="0" solo hide-details flat).group__input
            .control.plus(@click='incr("trpl")'): v-icon mdi-plus
          .search-menu__field-group
            span.group__name Total Pax:
            .control.plus(@click='decr("pax")'): v-icon mdi-minus
            v-text-field(v-model='filters.pax' @input='recalc("pax")' placeholder="0" solo hide-details flat).group__input
            .control.plus(@click='incr("pax")'): v-icon mdi-plus
          
          .layout.mt-3
            v-spacer
            v-btn(text color="primary" @click="eventSizeMenu = false") OK

      v-btn.search-item.button.submit(@click="search" color='white--text')
        span.label Search

  //- SEARCH PARAMS

  .search-params(v-if='searchParams')
    v-spacer
    span.search-params__amount {{ hotelsAmount }}
    span.search-params__sort.ml-3 
      span.mr-1 Sort by:
      v-menu(offset-y)
        template(v-slot:activator="{ on }")
          span(v-on="on").select 
            span.name {{ filters.sortby }}
              v-icon(size='20') mdi-chevron-down
        v-list(color='white')
          v-list-item(@click='filters.sortby = item' v-for='item in sortItems' :key='item')
            v-list-item-title(v-text='item').text-capitalize

</template>

<script>
import pick from 'lodash.pick'
import compact from 'lodash.compact'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      filters: {
        from: null,
        to: null,
        dates: [],
        nights: 3,
        // rooms
        sgl: null,
        dbl: null,
        trpl: null,
        pax: null,
        sortby: 'price',
        product_id: 1,

        // signals that there's a query from search-panel
        searchPanel: true
      },
      dateMessage: ['Choose departure day', 'Choose arrival day', ''],
      sortItems: ['price', 'stars'],
      dateMenu: null,
      eventSizeMenu: null,
      fromMenu: null,
      numberFields: [
        'product_id',
        'from',
        'to',
        'nights',
        'sgl',
        'dbl',
        'trpl',
        'pax'
      ]
    }
  },
  async created() {
    let { query } = await this.$route

    if (query.searchPanel) {
      let getFilters = pick(query, [
        ...Object.keys(this.filters),
        'product_id',
        'single',
        'double',
        'triple',
        'arrival_date',
        'departure_date'
      ])

      this.numberFields.forEach(item => {
        // if (!Array.isArray(item)) {
        getFilters[item] = Number(getFilters[item])
        // } else {
        //   getFilters[item[1]] = Number(getFilters[item[0]])
        //   delete getFilters[item[0]]
        // }
      })

      getFilters.dates = compact([
        getFilters.departure_date,
        getFilters.arrival_date
      ])

      delete getFilters.departure_date, getFilters.arrival_date

      this.$set(this, 'filters', { ...this.filters, ...getFilters })
      this.recalc()
    }
  },
  computed: {
    ...mapState({
      filtersData: state => state.filters
    }),
    ...mapGetters({
      fromLocationsList: 'filters/fromLocationsList',
      toLocationsList: 'filters/toLocationsList'
    }),
    travelRange() {
      if (this.filters.dates.length < 1) return
      let departureDate = this.filters.dates[0]
      let arrivalDate = this.filters.dates[1]

      departureDate = this.$dayjs(departureDate).format('DD.MM')

      arrivalDate = arrivalDate
        ? this.$dayjs(arrivalDate).format('DD.MM')
        : '...'

      return departureDate + ' - ' + arrivalDate
    }
  },
  methods: {
    ...mapMutations({ showSnackbar: 'snackbar/showSnackbar' }),
    incr(index) {
      this.filters[index]++
      this.recalc(index)
    },
    decr(index) {
      let value = this.filters[index]
      if (value > 0) this.filters[index]--
      this.recalc(index)
    },
    allowedDates(widgetDate) {
      let { dates } = this.filters
      let range = 3

      /*      if(dates.length == 0){
        return this.$dayjs(widgetDate).unix() >= this.$dayjs(this.filtersData.minDate).unix() && this.$dayjs(widgetDate).unix() <= this.$dayjs(this.filtersData.maxDate).unix()
      }*/

      if (dates.length == 1) {
        let diff = this.$dayjs(widgetDate).diff(this.$dayjs(dates[0]), 'days')
        return 0 <= diff && diff <= range //&& this.$dayjs(widgetDate).unix() <= this.$dayjs(this.filtersData.maxDate).unix()
      }
      if (dates.length == 3) this.filters.dates = [dates[2]]

      if (dates.length > 3) this.filters.dates = []
      //if (dates.length === 2){ this.dateMenu = false }

      return true
    },
    datesInRange(widgetDate) {
      let { dates } = this.filters

      if (dates.length < 2) return false

      let minDate = new Date(dates[0])
      let maxDate = new Date(dates[1])
      let toCompareDate = new Date(widgetDate)

      return minDate < toCompareDate && toCompareDate < maxDate
    },
    async search() {
      if (!this.validate()) return

      let query = this.$route.query
      let filters = this.filters

      query = { ...query, ...filters }

      query.departure_date = query.dates[0]
      query.arrival_date = query.dates[1]
      delete query.dates

      this.$router.push({ path: '/search', query })
      await this.$emit('search')
    },
    recalc(e) {
      if (e == 'pax') {
        this.filters.sgl = 0
        this.filters.dbl =
          this.filters.pax > 0 ? Math.ceil(this.filters.pax / 2) : 0
        this.filters.trpl = 0
      } else {
        this.filters.pax =
          Number(this.filters.sgl) +
          Number(this.filters.dbl * 2) +
          Number(this.filters.trpl * 3)
      }
    },
    validate() {
      if (!this.filters.from) {
        return this.showSnackbar({
          message: 'Departure location must be specified',
          color: 'red'
        })
      }
      if (!this.filters.to) {
        return this.showSnackbar({
          message: 'Arrival location must be specified',
          color: 'red'
        })
      }
      if (this.filters.dates.length < 2) {
        return this.showSnackbar({
          message: 'Both departure and arrival dates must be specified',
          color: 'red'
        })
      }

      return true
    }
  },
  watch: {
    'filters.departure_date'() {
      this.filters.arrival_date = this.$dayjs(this.filters.departure_date)
        .add(this.filters.nights, 'day')
        .format('YYYY-MM-DD')
    }
  },
  props: {
    hotelsAmount: String,
    searchParams: Boolean
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/search-panel.sass'

</style>

