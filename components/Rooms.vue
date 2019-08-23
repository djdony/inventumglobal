<template lang="pug">
  .rooms__table
    v-simple-table
      thead
        th Room type
        th Number
        th Size
        th Occupancy
      tbody
        tr
          td Standart room
          td 10
          td 100 m²
          td 200
</template>

<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'

</style>