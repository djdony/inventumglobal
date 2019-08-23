<template lang='pug'>


    .meeting-space__table
      v-simple-table
        thead.icons
          th
          th: v-icon mdi-image-size-select-small
          th: v-icon mdi-human-male-height-variant
          th: v-icon mdi-tape-measure
          th: v-icon mdi-alpha-u-circle
          th: v-icon mdi-gamepad-circle-outline
          th: v-icon mdi-glass-cocktail
          th: v-icon mdi-theater
          th: v-icon mdi-google-classroom
          th: v-icon mdi-account-group
          th: v-icon mdi-vector-circle
          th: v-icon mdi-square-outline
        thead
          th Meeting Room
          th Room size
          th Ceiling  height
          th Room dimensions
          th U-shape
          th Banquet rounds
          th Cocktail rounds
          th Theater
          th Classroom
          th Boardroom
          th Crescent rounds (Cabaret)
          th Hollow square
        tbody
          tr
            td Rooms name
            td 48 m²
            td 2.9 m
            td 24 m x 22.4 m
            td 16
            td 60
            td 90
            td 45
            td 30
            td 24
            td 85
            td 7
</template>

<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'

</style>