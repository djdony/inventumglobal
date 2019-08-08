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
        v-checkbox(v-model='filters.stars.five' label="5 Stars" hide-details)
        v-checkbox(v-model='filters.stars.four' label="4 Stars" hide-details)
        v-checkbox(v-model='filters.stars.three' label="3 Stars" hide-details)
        v-checkbox(v-model='filters.stars.two' label="2 Stars" hide-details)
        v-checkbox(v-model='filters.stars.one' label="1 Stars" hide-details)

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
        v-select(:items="filters.roomType.items" v-model='filters.roomType.value' outlined hide-details)

    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Amenities
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.checkboxes
        v-checkbox(v-model='filters.amenities.airConditioned' label="Air-conditioned" hide-details)
        v-checkbox(v-model='filters.amenities.airportShuttle' label="Airport Shuttle" hide-details)
        v-checkbox(v-model='filters.amenities.fitness' label="Fitness" hide-details)
        v-checkbox(v-model='filters.amenities.wifi' label="Wi-Fi" hide-details)

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

    v-btn(color='primary' text).custom.mt-5.full-width Reset all filters

</template>

<script>
export default {
  data() {
    return {
      filters: {
        search: '',
        stars: {
          one: false,
          two: false,
          three: false,
          four: false,
          five: false
        },
        priceType: 'wedding',
        price: [100, 500],
        roomType: {
          items: ['SGL', 'DBL', 'TRP'],
          value: 'DBL'
        },
        amenities: {
          airConditioned: false,
          airportShuttle: false,
          fitness: false,
          wifi: false
        },
        meetingRooms: [0, 50],
        ceilingHeight: [0, 10],
        distance: [0, 10]
      }
    }
  },
  watch: {
    // filters: {
    //   handler(newFilters) {
    //     this.$emit("updateFilters", newFilters)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style lang="sass">
@import '@/assets/styles/components/search-filters.sass'

</style>


