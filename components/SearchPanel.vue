<template lang="pug">
div
  .search-panel
    .search-group
      .search-item.text 
        v-icon mdi-airplane-landing
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
            v-date-picker(v-model="filters.departure_date" no-title width='256' first-day-of-week='1')
              span(v-text='dateMessage[0]' v-if='filters.departure_date.length == 0').primary--text.caption.px-2.pb-1
            v-divider
            .search-menu__field-group
              span.group__name Nights:
              v-text-field(v-model='filters.nights' placeholder="0" solo hide-details flat).group__input
            .layout.px-4.py-2
              v-spacer
              v-btn(text color="primary" @click="dateMenu = false") OK
      
      
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
            v-text-field(v-model='filters.sgl' placeholder="0" solo hide-details flat @input="recalc").group__input
          .search-menu__field-group
            span.group__name Double rooms:
            v-text-field(v-model='filters.dbl' placeholder="0" solo hide-details flat @input="recalc").group__input
          .search-menu__field-group
            span.group__name Triple rooms:
            v-text-field(v-model='filters.trp' placeholder="0" solo hide-details flat @input="recalc").group__input
          .search-menu__field-group
            span.group__name Total Pax:
            v-text-field(v-model='filters.pax' placeholder="0" solo hide-details flat @input="recalc('pax')").group__input
          
          .layout.mt-3
            v-spacer
            v-btn(text color="primary" @click="eventSizeMenu = false") OK

      v-btn.search-item.button.submit(@click="search" color='white--text')
        span.label Search

  //- SEARCH PARAMS

  .search-params
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

export default {
  data() {
    return {
      filters: {
        from: null,
        to: null,
        departure_date: '',
        arrival_date: '',
        nights: 3,
        // rooms
        sgl: null,
        dbl: null,
        trp: null,
        pax: null,
        rt: 'dbl',
        sortby: 'price',
        // signals that there's a query from search-panel
        searchPanel: true
      },

      fromLocations: [],
      toLocations: [],
      dateMessage: ['Choose departure day', '', ''],
      sortItems: ['price', 'stars'],
      dateMenu: null,
      eventSizeMenu: null,
      fromMenu: null,
      numberFields: ['from', 'to', 'nights', 'sgl', 'dbl', 'trp', 'pax']
    }
  },
  async created() {
    this.fromLocations = await Location.custom('user/airports').get()
    this.toLocations = await Location.custom('user/destinations').get()

    let { query } = await this.$route
    if (query.searchPanel) {
      let getFilters = _.pick(query, Object.keys(this.filters))

      this.numberFields.forEach(item => {
        getFilters[item] = Number(getFilters[item])
      })

      this.$set(this, 'filters', { ...this.filters, ...getFilters })
    }
  },
  computed: {
    travelRange() {
      if (!this.filters.departure_date) return

      let nights = this.filters.nights

      let departureDate = this.$dayjs(this.filters.departure_date).format(
        'DD.MM'
      )

      let arrivalDate = this.$dayjs(this.filters.departure_date)
        .add(nights, 'day')
        .format('DD.MM')

      return departureDate + ' - ' + arrivalDate
    },
    fromLocationsList() {
      let list = []

      for (let location of this.fromLocations) {
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

      for (let location of this.toLocations) {
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
    // TODO: add validation
    async search() {
      let query = this.$route.query
      let filters = this.filters
      console.log()

      query = { ...query, ...filters }

      this.$router.push({ path: '/search', query })
      this.$emit('search')
    },
    recalc(e) {
      if (e == 'pax') {
        this.filters.sgl = 0
        this.filters.dbl =
          this.filters.pax > 0 ? Math.ceil(this.filters.pax / 2) : 0
        this.filters.trp = 0
      } else {
        this.filters.pax =
          Number(this.filters.sgl) +
          Number(this.filters.dbl * 2) +
          Number(this.filters.trp * 3)
      }
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
    hotelsAmount: String
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/search-panel.sass'

</style>

