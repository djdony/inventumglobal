<template lang="pug">
  .rooms__table
    v-simple-table(dense fixed-header).custom
      thead
        tr
          th.text-left Name
          th Cuisines
          th Food Included
          th Drinks Included
          th Type
      tbody
        tr(v-for="rst in restaurants" :key="rst.id")
          td.text-left(v-text="rst.name")
          td
            span(v-for='(c, index) in rst.cuisines' :key='index' v-text="rst.cuisines.length - 1 > index ? c.name + ', ' : c.name")
          td
            span(v-if="rst.type_id !== 'Bar' " v-text="rst.food  ? 'Included' : 'Extra'")
          td(v-text="rst.drinks ? 'Included' : 'Extra'")
          td(v-text="rst.type_id")
</template>

<script>
export default {
  props: {
    restaurants: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'

  .rooms__table
    width: 100%

</style>