<template lang="pug">
  .rooms__table
    v-simple-table(dense fixed-header).custom
      thead
        tr
          th.text-left Room type
          th.text-right Rooms
          th.text-right Area, m²
          th.text-right Quantity
      tbody
        tr(v-for="r in value" :key="r.id")
          td.text-left(v-text="r.room_type.name")
          td.text-right(v-text="r.room")
          td.text-right(v-text="r.min_area")
          td.text-right(v-text="r.qty")
</template>
<script type="text/javascript">
export default {
  props: ['value']
}
</script>
<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'

  .rooms__table
    width: 100%

</style>