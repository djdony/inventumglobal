<template lang="pug">
  v-card(:elevation='tabMode ? 0 : 2').details__section.location
    h3(v-if='!tabMode').section__title Location
    p.location__name(v-text="value.address")
    .location__map-wrapper
      iframe(:src="value.map" frameborder="0" style="border:0" allowfullscreen)
</template>
<script>
export default {
  props: {
    value: Object,
    tabMode: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'
  .location
    width: 100%
    color: #222
    .location
      &__name
        font-size: 14px
        font-weight: 400
      &__map-wrapper
        width: 100%
        iframe
          width: 100%
          height: 500px
</style>