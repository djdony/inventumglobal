<template lang="pug">
div
  .search-panel
    .search-group 
      .search-item.text 
        v-icon mdi-airplane-takeoff
        v-autocomplete(v-model='filters.from' :items ="fromLocationsList" placeholder='From' solo flat hide-details dense)

      .search-item.text 
        v-icon mdi-airplane-landing
        v-autocomplete(v-model='filters.to' :items="toLocationsList" placeholder='To' solo flat hide-details dense)
        
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
            v-date-picker(
              v-model="filters.dates"
              no-title width='256'
              first-day-of-week='1'
              multiple
              :allowed-dates='allowedDates'
              :min="filters.now"
              :max="filtersData.maxDate"
              :show-current='false'
              :events='datesInRange'
              event-color='#3273C2'
              @change="fetchAirlines" 
              ).range
              v-spacer
              span(v-text='dateMessage[filters.dates.length]' v-if='filters.dates.length < 2').primary--text.caption.px-2.pb-1
              v-btn(text color="primary" @click="dateMenu = false" v-else) OK
      
      .search-item.text
        v-icon mdi-airplane
        v-autocomplete(v-model='airline' :items="filters.airlines" placeholder='Aircraft' solo flat hide-details dense)

      v-btn.search-item.button.submit(@click="search" color='white--text')
        span.label Search

  //- SEARCH PARAMS
  div {{ filters.airlines }}
  .search-params(v-if='searchParams')
    v-spacer
    span.search-params__amount {{ hotelsAmount }}
    span.search-params__sort.ml-3 
      span.mr-1 Sort by:
      v-menu(offset-y)
        template(v-slot:activator="{ on }")
          span(v-on="on").select 
            span.name
              span(v-if="filters.sortby == 'price_asc'") Price low
              v-icon(v-if="filters.sortby == 'price_asc'" size='20') mdi-sort-ascending
              span(v-if="filters.sortby == 'price_desc'") Price high
              v-icon(v-if="filters.sortby == 'price_desc'" size='20') mdi-sort-descending
              v-icon(size='20') mdi-chevron-down
        v-list(color='white')
          v-list-item(v-for='item in sortItems' :key='item.id' @click='filters.sortby = item.id')
            v-list-item-title.text-capitalize
              | {{ item.name }} &nbsp;
              v-icon(size='20') {{ item.icon }}

</template>

<script>
import pick from 'lodash.pick'
import compact from 'lodash.compact'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      filters: {
        now: this.$dayjs().format("YYYY-MM-DD"),
        from: null,
        to: null,
        dates: [],
        nights: 3,
        sortby: 'price_asc',
        product_id: 1,
         airlines: [],
        
        // signals that there's a query from search-panel
        searchPanel: true,
      },
      dateMessage: ['Choose departure day', 'Choose arrival day', ''],
      sortItems: [
        { id: 'price_asc', dir: 'asc', name: 'Price Low', icon: 'mdi-sort-ascending' },
        { id: 'price_desc', dir: 'desc', name: 'Price High', icon: 'mdi-sort-descending' }
      ],
      dateMenu: null,
      fromMenu: null,
      //airline: [],
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
        getFilters[item] = Number(getFilters[item])
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
      toLocationsList: 'filters/toLocationsList',
    }),
      
    travelRange() {
      if (this.filters.dates.length < 1) return
      let departureDate = this.filters.dates[0]
      let arrivalDate = this.filters.dates[1]
       this.fetchAirlines()
     

      departureDate = this.$dayjs(departureDate).format('DD.MM')

      arrivalDate = arrivalDate
        ? this.$dayjs(arrivalDate).format('DD.MM')
        : '...'
      return departureDate + ' - ' + arrivalDate
    },
  
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


      if (dates.length == 1) {
        let diff = this.$dayjs(widgetDate).diff(this.$dayjs(dates[0]), 'days')
        return 0 <= diff && diff <= range
      }
      if (dates.length == 3) this.filters.dates = [dates[2]]

      if (dates.length > 3) this.filters.dates = []

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
    async fetchAirlines(){
       
       if (!this.filters.dates[1]) return
      
      let list = await this.$axios.get('/user/filters', { params: {'arrival_date': this.filters.dates[0] }} )
      console.log(list.data.airline)
      this.filters.airlines[0][name] = 'Atlas'
      this.filters.airlines[1][name] = 'Inventum'
      
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
    },
    'filters.sortby'(){
      this.search()
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

