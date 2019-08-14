<template lang="pug">
  v-card(elevation='8').search-filters 
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Search hotels
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.text-input
        v-text-field(v-model='filters.search' prepend-inner-icon="mdi-magnify" placeholder='Hotel name, address' outlined hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Hotel class
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(v-model='filters.s5' label="5 Stars" hide-details)
        v-checkbox(v-model='filters.s4' label="4 Stars" hide-details)
        v-checkbox(v-model='filters.s3' label="3 Stars" hide-details)
        v-checkbox(v-model='filters.s2' label="2 Stars" hide-details)
        v-checkbox(v-model='filters.s1' label="1 Stars" hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Type of price
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.radios
        v-radio-group(v-model="filters.priceType" hide-details)
          v-radio(label="Mice" value="mice")
          v-radio(label="Wedding" value="wedding")

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Price
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span(v-text='`€${filters.price[0]}`')
        .values__item
          span(v-text='`€${filters.price[1]}`')
      .filter-item__row.slider
        v-range-slider(hide-details :min="100" :max="500" color='#0056b3' track-color='#DDDFE7' v-model="filters.price")

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Room type
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.select
        v-select(:items="roomTypeItems" v-model='filters.room_type' outlined hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Amenities
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(v-model='filters.airConditioned' label="Air-conditioned" hide-details)
        v-checkbox(v-model='filters.airportShuttle' label="Airport Shuttle" hide-details)
        v-checkbox(v-model='filters.fitness' label="Fitness" hide-details)
        v-checkbox(v-model='filters.wifi' label="Wi-Fi" hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Meeting rooms
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span(v-text='filters.meetingRooms[0]')
        .values__item
          span(v-text='filters.meetingRooms[1]')
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="50" color='#0056b3' track-color='#DDDFE7' v-model="filters.meetingRooms")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Ceiling height
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span(v-text='`${filters.ceilingHeight[0]} m`')
        .values__item
          span(v-text='`${filters.ceilingHeight[1]} m`')
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="10" color='#0056b3' track-color='#DDDFE7' v-model="filters.ceilingHeight")

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Distance from airport
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span(v-text='`${filters.distance[0]} km`')
        .values__item
          span(v-text='`${filters.distance[1]} km`')
      .filter-item__row.slider
        v-range-slider(hide-details :min="1" :max="10" color='#0056b3' track-color='#DDDFE7' v-model="filters.distance")

    //- .filter-item.pa-0
    //-   v-btn(text color='secondary').custom.fluid
    //-     span Distance from airport
    //-     v-icon(size='24') mdi-chevron-right

    v-btn(color='primary' @click='search').custom.mt-5.full-width Apply filters
    v-btn(color='primary' text @click='reset').custom.mt-2.full-width Reset all filters

</template>

<script>
export default {
  data() {
    return {
      filters: {
        search: '',

        s1: false,
        s2: false,
        s3: false,
        s4: false,
        s5: false,

        priceType: 'mice',
        price: [100, 500],
        room_type: 'dbl',
        airConditioned: false,
        airportShuttle: false,
        fitness: false,
        wifi: false,
        meetingRooms: [0, 50],
        ceilingHeight: [0, 10],
        distance: [0, 10],
        // signals that there's a query from search-filters
        searchFilters: true
      },
      roomTypeItems: ['sgl', 'dbl', 'trp'],
      rangeFields: ['price', 'meetingRooms', 'ceilingHeight', 'distance'],
      booleanFields: [
        's1',
        's2',
        's3',
        's4',
        's5',
        'airConditioned',
        'airportShuttle',
        'fitness',
        'wifi'
      ]
    }
  },
  created() {
    let { query } = this.$route

    if (query.searchFilters) {
      query = this.getToRangeFields(query)

      this.booleanFields.forEach(item => {
        query[item] = query[item] === 'true'
      })

      let getFilters = _.pick(query, Object.keys(this.filters))
      this.$set(this, 'filters', { ...this.filters, ...getFilters })
    }
  },
  methods: {
    search() {
      let query = this.$route.query
      let filters = this.filters
      query = { ...query, ...filters }

      this.rangeFields.forEach(item => {
        query[item + 'Min'] = query[item][0]
        query[item + 'Max'] = query[item][1]
        delete query[item]
      })

      this.$router.push({ path: '/search', query })
      this.$emit('search')
    },
    /**
     * @example { price: [10, 50] } => { priceMax: 10, priceMin: 50 }
     */
    rangeFieldsToGet(query) {
      this.rangeFields.forEach(item => {
        query[item + 'Min'] = query[item][0]
        query[item + 'Max'] = query[item][1]
        delete query[item]
      })

      return query
    },
    /**
     * @example { priceMax: 10, priceMin: 50 } => { price: [10, 50] }
     */
    getToRangeFields(query) {
      this.rangeFields.forEach(item => {
        query[item] = []
        query[item][0] = query[item + 'Min']
        query[item][1] = query[item + 'Max']

        delete query[item + 'Min']
        delete query[item + 'Max']
      })

      return query
    },
    reset() {
      this.filters = {
        search: '',

        s1: false,
        s2: false,
        s3: false,
        s4: false,
        s5: false,

        priceType: 'mice',
        price: [100, 500],
        room_type: 'dbl',
        airConditioned: false,
        airportShuttle: false,
        fitness: false,
        wifi: false,
        meetingRooms: [0, 50],
        ceilingHeight: [0, 10],
        distance: [0, 10],
        // signals that there's a query from search-filters
        searchFilters: true
      }

      let { query } = this.$route
      query = { ...query, ...this.filters }

      query = this.rangeFieldsToGet(query)
      console.log(query)

      this.$router.push({ path: '/search', query })
      this.$emit('search')
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/styles/components/search-filters.sass'

</style>


