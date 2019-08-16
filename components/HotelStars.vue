<template lang="pug">
  .hotel-stars
    span(v-text='stars.name').stars__value
    v-icon(v-if='stars.icon') mdi-star
</template>

<script>
export default {
  props: {
    id: [Number, String]
  },
  computed: {
    stars() {
      let name = this.$store.state.stars.stars[1 * this.id - 1].name

      let icon = !isNaN(name[0] * 1)
      return { name, icon }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/components/hotel-stars.sass'

</style>