<template lang="pug">
  v-card(elevation='8').search-filters 
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Rating
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 3
          v-icon(size='16') mdi-star
        .values__item
          span 5
          v-icon(size='16') mdi-star
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.rating")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Guest rooms
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 0
        .values__item
          span 1,000+
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.guestRooms")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Largest room
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 0 m²
        .values__item
          span 10,000+ m²
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.largestRoom")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Total meeting space
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 0 m²
        .values__item
          span 10,000+ m²
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.totalMeetingSpace")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Meeting rooms
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 0
        .values__item
          span 50+
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.meetingRooms")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Ceiling height
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 0 m
        .values__item
          span 10 m
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.ceilingHeight")
    
    .filter-item
      .filter-item__row.mb-2
        span.filter-item__title Seating capacity
        v-icon(size='16').filter-item__more mdi-dots-horizontal
      .filter-item__row.values
        .values__item
          span 0
        .values__item
          span 200+
      .filter-item__row.slider
        v-range-slider(hide-details :min="0" :max="100" color='#0056b3' track-color='#DDDFE7' v-model="filters.seatingCapacity")

    .filter-item.pa-0
      v-btn(text color='secondary').custom.fluid
        span Distance from airport
        v-icon(size='24') mdi-chevron-right

    v-btn(color='primary').custom.mt-5.full-width Reset all filters

</template>

<script>
export default {
  data() {
    return {
      filters: {
        rating: [0, 100],
        guestRooms: [0, 100],
        largestRoom: [0, 100],
        totalMeetingSpace: [0, 100],
        meetingRooms: [0, 100],
        ceilingHeight: [0, 100],
        seatingCapacity: [0, 100]
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


