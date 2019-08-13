<template lang="pug">
  v-card(elevation='8').search-filters 
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Search hotels
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.text-input
        v-text-field(v-model='filters.search' placeholder='Hotel name, address' outlined hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Hotel class
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(v-model='filters.fiveStars' label="5 Stars" hide-details)
        v-checkbox(v-model='filters.fourStars' label="4 Stars" hide-details)
        v-checkbox(v-model='filters.threeStars' label="3 Stars" hide-details)
        v-checkbox(v-model='filters.twoStars' label="2 Stars" hide-details)
        v-checkbox(v-model='filters.oneStars' label="1 Stars" hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Type of price
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.radios
        v-radio-group(v-model="filters.priceType" hide-details)
          v-radio(label="Wedding" value="wedding")
          v-radio(label="Mice" value="mice")

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

        twoStars: false,
        oneStars: false,
        threeStars: false,
        fourStars: false,
        fiveStars: false,

        priceType: 'wedding',
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
      roomTypeItems: ['sgl', 'dbl', 'trp']
    }
  },
  created() {
    let { query } = this.$route

    if (query.searchFilters) {
      // convert 'fieldFrom' and 'fieldTo' to arrays
      for (let index of [
        'price',
        'meetingRooms',
        'ceilingHeight',
        'distance'
      ]) {
        query[index] = []
        query[index][0] = query[index + 'From']
        query[index][1] = query[index + 'To']

        delete query[index + 'From']
        delete query[index + 'To']
      }

      this.$set(this, 'filters', query)
    }
  },
  methods: {
    search() {
      let query = this.$route.query
      let filters = this.filters

      query = { ...query, ...filters }

      // convert arrays to 'fieldFrom' and 'fieldTo'
      for (let index of [
        'price',
        'meetingRooms',
        'ceilingHeight',
        'distance'
      ]) {
        query[index + 'From'] = query[index][0]
        query[index + 'To'] = query[index][1]
        delete query[index]
      }

      this.$router.push({ path: '/search', query })

      this.$emit('search')
    },
    reset() {
      this.filters = {
        search: '',

        twoStars: false,
        oneStars: false,
        threeStars: false,
        fourStars: false,
        fiveStars: false,

        priceType: 'wedding',
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
      this.$router.push({ path: '/search', query })
      this.$emit('search')
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/styles/components/search-filters.sass'

</style>


