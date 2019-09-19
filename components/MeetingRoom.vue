<template lang='pug'>
  .rooms__table
    v-simple-table(fixed-header).custom
      thead
        tr.icons
          th
          th(v-if="!excludeColumns.includes('area')"): v-icon mdi-image-size-select-small
          th(v-if="!excludeColumns.includes('length')"): v-icon mdi-arrow-expand-vertical
          th(v-if="!excludeColumns.includes('width')"): v-icon mdi-arrow-expand-horizontal
          th: v-icon mdi-human-male-height-variant
          th: v-icon mdi-gamepad-circle-outline
          th: v-icon mdi-glass-cocktail
          th: v-icon mdi-theater
          th: v-icon mdi-google-classroom
          th: v-icon mdi-alpha-u-circle
          th(v-if="!excludeColumns.includes('boardroom')"): v-icon mdi-vector-circle
        tr
          th.text-left Name
          th.text-right(v-if="!excludeColumns.includes('area')") Room Size, m2
          th(v-if="!excludeColumns.includes('length')").text-right Length, m
          th(v-if="!excludeColumns.includes('width')").text-right Width, m
          th.text-right Ceiling Height, m
          th.text-right Gala, pax
          th.text-right Cocktail, pax
          th.text-right Theater, pax
          th.text-right Classroom, pax
          th.text-right U-shape, pax
          th.text-right(v-if="!excludeColumns.includes('boardroom')") Boardroom, pax
      tbody
        tr(v-for="m in value" :key="m.id")
          td.text-left(v-text="m.name")
          td.text-right(v-text="m.area" v-if="!excludeColumns.includes('area')")
          td.text-right(v-text="m.length" v-if="!excludeColumns.includes('length')")
          td.text-right(v-text="m.width" v-if="!excludeColumns.includes('width')")
          td.text-right(v-text="m.height")
          td.text-right(v-text="m.banquet")
          td.text-right(v-text="m.cocktail")
          td.text-right(v-text="m.theater")
          td.text-right(v-text="m.classroom")
          td.text-right(v-text="m.ushape")
          td.text-right(v-text="m.boardroom" v-if="!excludeColumns.includes('boardroom')")
</template>
<script type="text/javascript">
export default {
  props: {
    value: Array,
    excludeColumns: {
      type: Array,
     default: () => ([])
    }
  }
}
</script>
<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'

  .rooms__table
    width: 100%

</style>