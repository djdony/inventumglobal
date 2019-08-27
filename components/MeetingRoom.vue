<template lang='pug'>
  .meeting-space__table
    v-simple-table(fixed-header).custom
      thead
        tr.icons
          th
          th: v-icon mdi-image-size-select-small
          th: v-icon mdi-arrow-expand-vertical
          th: v-icon mdi-arrow-expand-horizontal
          th: v-icon mdi-human-male-height-variant
          th: v-icon mdi-gamepad-circle-outline
          th: v-icon mdi-glass-cocktail
          th: v-icon mdi-theater
          th: v-icon mdi-google-classroom
          th: v-icon mdi-alpha-u-circle
          th: v-icon mdi-vector-circle
        tr
          th Name
          th.text-right Area, m2
          th.text-right Length, m
          th.text-right Width, m
          th.text-right Height, m
          th.text-right Gala, pax
          th.text-right Cocktail, pax
          th.text-right Theater, pax
          th.text-right Classroom, pax
          th.text-right U-shape, pax
          th.text-right Boardroom, pax
      tbody
        tr(v-for="m in value" :key="m.id")
          td.text-left(v-text="m.name")
          td.text-right(v-text="m.area")
          td.text-right(v-text="m.length")
          td.text-right(v-text="m.width")
          td.text-right(v-text="m.height")
          td.text-right(v-text="m.banquet")
          td.text-right(v-text="m.cocktail")
          td.text-right(v-text="m.theater")
          td.text-right(v-text="m.classroom")
          td.text-right(v-text="m.ushape")
          td.text-right(v-text="m.boardroom")
</template>
<script type="text/javascript">
export default {
  props: ['value']
}
</script>
<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'
</style>