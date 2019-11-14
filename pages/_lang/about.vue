<template lang='pug'>

  v-content.home-page
    v-container
      //- About US

      v-layout(
        ecommerce-part
        wrap
        align-center
      )
        v-flex(md5)
          h2.display-2.font-weight-bold Inventum Global
          h2.display-2.font-weight-light ABOUT US
          p.mt-4 Inventum Global offers services at international standards for unique travel experiences. Inventum Global generates innovative ideas that bring out the unique character of each project and manages its application.
            p  Our goal is to understand the needs correctly, and to be able to offer an optimal solution every time.

        v-flex(md5 offset-md2)
          v-img(src="https://www.inventumglobal.com/uploads/galleries/photos/165-medya/5c0e86accb524-photograph-68png.png")

      //- What We Do Part
    
    .steps-part
      v-container
        v-layout.part-title
          v-flex
            h3.display-1.font-weight-light What we do?
        v-layout(wrap align-center)
          .steps-wrapper
            v-flex(md3 sm6 step)
              .step__number M
              h4.step__title M.I.C.E
              p.step__desc The Inventum Global teams use the energy, productivity, and unique consultancy approaches in order to produce a real Inventum Global experience for your meetings, conference, congresses.
            v-flex(md3 sm6 step)
              .step__number W
              h4.step__title Wedding
              p.step__desc A luxury wedding? Or a beach wedding? Or a small and intimate wedding? Maybe a unique wedding ... Our private wedding team works to organize everything for you.
            v-flex(md3 sm6 step)
              .step__number V
              h4.step__title VIP
              p.step__desc We are here to provide the perfect VIP service you need. From stylish, boutique hotels to iconic or luxurious holidays and to incredible tours, Inventum VIP offers the experiences you need.
            v-flex(md3 sm6 step)
              .step__number S
              h4.step__title Special Events
              p.step__desc Our personalized service offers hotels, flights, authentic experiences to provide the most unique vacation possible.


    //- References

    v-container
      blockquote(class="blockquote")
        h1(align="center") REFERENCES
      v-row
        v-col(
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
          )
          v-card
            v-img(:src="card.src" height="150px" contain class="black--text align-end")

</template>

<script>

import {applyAsyncData} from "../../.nuxt/utils";

export default {
    auth: false,
    data: () => ({
        cards: [],
    }),
  async created() {
      this.cards = await this.$axios.$get(`/references`)
  },
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/pages/home.sass'

</style>
