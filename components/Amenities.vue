<template lang="pug">
  .rooms__table
    v-simple-table(dense fixed-header).custom
      thead
        tr
          th.text-left Name
          th Included
          th Type
      tbody
        tr(v-for="a in amenities" :key="a.id")
          td.text-left(v-text="a.name")
          td(v-text="a.included ? 'Extra' : 'Free'")
          td(v-text="a.type")
</template>

<script>
export default {
  props: {
    amenities: {
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