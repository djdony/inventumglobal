<template lang="pug">
  v-card(elevation='8').search-filters 
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Search hotels
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.text-input
        v-text-field(
          v-model='filters.search'
          prepend-inner-icon="mdi-magnify"
          placeholder='Hotel name, address'
          outlined
          hide-details
          @keyup.enter="search"
        )

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
        span.filter-item__title Price Category
      v-radio-group(
        v-model="filters.price_category"
        row
        outlined
        hide-details
        )
        v-tooltip(bottom)
          template(v-slot:activator="{ on }")
            v-radio(label="B2B" value="b2b" v-on="on").mr-2
          span Price for agencies
        v-tooltip(bottom)
          template(v-slot:activator="{ on }")
            v-radio(label="B2C" value="b2c" v-on="on").ml-2
          span Price for clients

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Package Price
      .filter-item__row.text-input
        v-text-field(
          v-model='filters.price[0]'
          outlined
          hide-details
          label="Min"
          prefix="€"
        ).mr-2
        span &mdash;
        v-text-field(
          v-model='filters.price[1]'
          outlined
          hide-details
          label="Max"
          prefix="€"
        ).ml-2

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
        span.filter-item__title Chain Scale
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(
          v-for="c in filtersData.hotelChains"
          v-model='filters.chains'
          :key="c.id"
          :value="c.id"
          :label="c.name"
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
        span.filter-item__title Seating capacity (pax)
      .filter-item__row.text-input
        v-text-field(
          v-model='filters.meetingRooms[0]'
          outlined
          label="Min"
          hide-details
          ).mr-2
        span &mdash;
        v-text-field(
          v-model='filters.meetingRooms[1]'
          outlined
          label="Max"
          hide-details
        ).ml-2

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
          :min="0"
          :max="filtersData.maxdistance"
          color='#0056b3'
          track-color='#DDDFE7'
          v-model="filters.distance"
        )

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
        price_category: 'b2b',
        stars: [],
        price: [100, 2000],
        room_type: 'DBL',
        amenities: [],
        chains: [],
        categories: [],
        meetingRooms: [0, 18000],
        ceilingHeight: [0, 20],
        distance: [0, 300],
        searchFilters: true
      },
      rangeFields: ['price', 'meetingRooms', 'ceilingHeight', 'distance']
    }
  },
  async mounted() {
    let query = qs.parse(location.search.slice(1))
    if (query.searchFilters) {
      this.watchRangesMaxValues('setGetValues', query)
    } else {
      this.watchRangesMaxValues('resetRangesMaxValues')
    }
  },
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
        price_category: 'b2b',
        price: [100, 2000],
        room_type: 'DBL',
        amenities: [],
        chains: [],
        meetingRooms: [0, 18000],
        ceilingHeight: [0, 20],
        distance: [0, 300],
        searchFilters: true
      }
      this.resetRangesMaxValues()
      this.search()
    },
    resetRangesMaxValues() {
      console.log(this.filtersData)

      this.$set(this.filters.price, 1, this.filtersData.price)
      this.$set(this.filters.meetingRooms, 1, this.filtersData.meetingRoomCap)
      this.$set(this.filters.ceilingHeight, 1, this.filtersData.ceilingHeight)
      this.$set(this.filters.distance, 1, this.filtersData.maxdistance)
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


