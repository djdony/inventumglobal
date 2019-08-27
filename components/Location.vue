<template lang="pug">
  v-card(:elevation='tabMode ? 0 : 2').details__section.location
    h3(v-if='!tabMode').section__title Location
    p.location__name Özlü Mah. Tesisler Cad. No 450, Aksu, Antalya, 07710, Turkey
    .location__map-wrapper
      iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112996.20297449981!2d30.830003278360913!3d36.868956792332014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c382a28b7af6fb%3A0x49c233c8eeec9edb!2sTesisler+Cd+No%3A450!5e0!3m2!1sru!2sru!4v1565431337281!5m2!1sru!2sru" frameborder="0" style="border:0" allowfullscreen)
</template>

<script>
export default {
  props: {
    tabMode: {
      type: Boolean,
      default: false
    }
  }
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