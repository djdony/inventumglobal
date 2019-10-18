<template lang='pug'>
  v-content.details-page
    v-container

      //- Address
      v-card.details__section.location
        .location__map-wrapper
          iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.3630070430727!2d30.767668215574087!3d36.85772897215841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39b1c37d77ed7%3A0xdbc2d625010899fc!2sInventum%20Global!5e0!3m2!1sen!2str!4v1571230050093!5m2!1sen!2str" frameborder="0" style="border:0" )

      v-card(style="text-align:center").details__section.overview
        h3.section__title Inventum Global Head Office
        .overview__content
        hr
        p
        p Çağlayan Mah. Bülent Ecevit Bulv. Münire Öztekin Apt. No:125 K:1 D:1 07230, Antalya, Türkiye
          v-row
            v-col(cols="4") T: +90 242 324 11 65
            v-col(cols="4") F: +90 242 324 11 25
            v-col(cols="4") E:info@inventumglobal.com
      v-card(style="text-align:center").details__section.overview
        h3.section__title Send us Email
        v-row
          v-col(cols="1")
          v-col(cols="10")
            VueliForm
          v-col(cols="1")

</template>
<script>
    import VueliForm from "~/components/VueliForm.vue";
  export default {
      auth: false,
      components: {
          VueliForm
      }
  }
</script>
<style lang="sass">
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
          height: 300px
</style>
