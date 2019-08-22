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
        span.filter-item__title Hotel category
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(
          v-for="s in filtersData.stars"
          :key="s.id"
          :value="s.id"
          :label="s.name"
          v-model='filters.stars'
          hide-details
        )

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Product type
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.radios
        v-radio-group(v-model="filters.product_id" hide-details)
          v-radio(
            v-for="p in filtersData.products"
            :key="p.id"
            :value="p.id"
            :label="p.name"
          )

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
        v-range-slider(
          hide-details
          :min="100"
          :max="filtersData.price"
          color='#0056b3'
          track-color='#DDDFE7'
          v-model="filters.price"
        )

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Room type
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.select
        v-select(
          :items="filtersData.roomTypes"
          v-model='filters.room_type'
          item-text="name"
          item-value="id"
          outlined
          hide-details
        )

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Amenities
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(
          v-for="a in filtersData.hotelAmenities"
          v-model='filters.amenities'
          :key="a.id"
          :value="a.id"
          :label="a.name"
          hide-details
        )

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Meeting room capacity
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span(v-text='filters.meetingRooms[0]')
        .values__item
          span(v-text='filters.meetingRooms[1]')
      .filter-item__row.slider
        v-range-slider(
          hide-details
          :min="0"
          :max="filtersData.meetingRoomCap"
          color='#0056b3'
          track-color='#DDDFE7'
          v-model="filters.meetingRooms"
        )
    
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
        v-range-slider(
          hide-details
          :min="0"
          :max="filtersData.ceilingHeight"
          color='#0056b3'
          track-color='#DDDFE7'
          v-model="filters.ceilingHeight"
        )

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
        v-range-slider(
          hide-details
          :min="filters.distance[0]"
          :max="filtersData.distance"
          color='#0056b3'
          track-color='#DDDFE7'
          v-model="filters.distance"
        )

    //- .filter-item.pa-0
    //-   v-btn(text color='secondary').custom.fluid
    //-     span Distance from airport
    //-     v-icon(size='24') mdi-chevron-right

    v-btn(color='primary' @click='search').custom.mt-5.full-width Apply filters
    v-btn(color='primary' text @click='reset').custom.mt-2.full-width Reset all filters

</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      filters: {
        search: '',
        stars: [],
        product_id: null,
        price: [100, 2000],
        room_type: 'DBL',
        amenities: [],
        meetingRooms: [0, 1500],
        ceilingHeight: [0, 10],
        distance: [0, 200],
        searchFilters: true
      },
      rangeFields: ['price', 'meetingRooms', 'ceilingHeight', 'distance']
    }
  },
  async created() {
    let query = qs.parse(location.search.slice(1))

    if (query.searchFilters) {
      this.watchRangesMaxValues('setGetValues', query)
    } else {
      this.watchRangesMaxValues('resetRangesMaxValues')
    }
  },
  mounted() {},
  methods: {
    search() {
      let query = qs.parse(location.search.slice(1))
      let newQuery = qs.stringify({ ...query, ...this.filters })
      this.$router.push({ path: `/search?${newQuery}` })
      this.$emit('search')
    },
    reset() {
      this.filters = {
        search: '',
        stars: [],
        product_id: 1,
        price: [100, 500],
        room_type: 'DBL',
        amenities: [],
        meetingRooms: [0, 500],
        ceilingHeight: [0, 10],
        distance: [0, 100],
        searchFilters: true
      }
      this.resetRangesMaxValues()
      this.search()
    },
    resetRangesMaxValues() {
      this.$set(this.filters.price, 1, this.filtersData.price)
      this.$set(this.filters.meetingRooms, 1, this.filtersData.meetingRoomCap)
      this.$set(this.filters.ceilingHeight, 1, this.filtersData.ceilingHeight)
      this.$set(this.filters.distance, 1, this.filtersData.distance)
    },
    setGetValues(query) {
      this.rangeFields.forEach(item => {
        query[item] = query[item].map(value => Number(value))
      })

      this.$set(this, 'filters', { ...this.filters, ...query })
    },
    watchRangesMaxValues(func, query) {
      this.$watch('filtersData.price', () => {
        this[func](query)
      })
    }
  },
  computed: {
    ...mapState({
      filtersData: state => state.filters
    })
  }
}
</script>

<style lang="sass">
@import '@/assets/styles/components/search-filters.sass'

</style>


