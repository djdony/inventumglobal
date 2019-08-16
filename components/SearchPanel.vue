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
            v-date-picker(v-model="filters.dates" no-title width='256' first-day-of-week='1' multiple :allowed-dates='allowedDates' :show-current='false' :events='datesInRange' event-color='#3273C2').range
              v-spacer
              span(v-text='dateMessage[filters.dates.length]' v-if='filters.dates.length < 2').primary--text.caption.px-2.pb-1
              v-btn(text color="primary" @click="dateMenu = false" v-else) OK
      
      
      v-menu(offset-y v-model="eventSizeMenu" transition="scale-transition"  :close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.search-item.button(v-on='on')
            .text
              span.label Event size
              span(v-text='filters.pax').value
            v-icon mdi-human-male
        v-card.search-menu.white.secondary--text
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
    span(v-text='hotelsAmount').search-params__amount 
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
import Location from '@/models/Location'
import _ from 'lodash'
import { mapState } from 'vuex'

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
        // signals that there's a query from search-panel
        searchPanel: true,
        // for GET queries
        arrival_date: '',
        departure_date: ''
      },
      dateMessage: ['Choose departure day', 'Choose arrival day', ''],
      sortItems: ['price', 'stars'],
      dateMenu: null,
      eventSizeMenu: null,
      fromMenu: null,
      numberFields: ['from', 'to', 'nights', 'sgl', 'dbl', 'trpl', 'pax']
    }
  },
  async created() {
    let { query } = await this.$route
    if (query.searchPanel) {
      let getFilters = _.pick(query, Object.keys(this.filters))

      this.numberFields.forEach(item => {
        getFilters[item] = Number(getFilters[item])
      })

      getFilters.dates = _.compact([
        getFilters.departure_date,
        getFilters.arrival_date
      ])
      console.log(getFilters)

      delete getFilters.departure_date, getFilters.arrival_date

      this.$set(this, 'filters', { ...this.filters, ...getFilters })
    }
  },
  computed: {
    ...mapState({
      filtersData: state => state.filters
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
    },
    fromLocationsList() {
      let list = []

      for (let location of this.filtersData.fromLocations) {
        for (let descendant of location.descendants) {
          list.push({
            text: location.name + ', ' + descendant.name,
            value: descendant.id
          })
        }
      }

      return list
    },
    toLocationsList() {
      let list = []

      for (let location of this.filtersData.toLocations) {
        for (let descendant of location.descendants) {
          list.push({
            text: location.name + ', ' + descendant.name,
            value: descendant.id
          })
        }
      }

      return list
    }
  },
  methods: {
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
      let errors = 0

      if (!this.filters.from) {
        errors++
        this.$toast.error('Departure location must be specified')
      }
      if (!this.filters.to) {
        errors++
        this.$toast.error('Arrival location must be specified')
      }
      if (this.filters.dates.length < 2) {
        errors++
        this.$toast.error('Both departure and arrival dates must be specified')
      }

      if (errors > 0) return false

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

