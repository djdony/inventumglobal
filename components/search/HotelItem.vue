<template lang="pug">
  v-card(elevation='8' :class='{compact}').hotels__item
    .hotel__image
      img(src='/img/home/ecommerce.png' alt='Hotel Image')
    .hotel__info
      h3(v-text='title').info__title

      .info__reviews
        .reviews__stars
          v-icon(color='primary' v-for='i in stars' :key='i') mdi-star
        span(v-text='regions.join(" / ")').reviews__regions

      .info__props
        .props__item(v-for='(prop, index) in props' :key='index')
          b(v-text='prop[0] + ": "')
          span(v-text='prop[1]')

      .info__price(v-if='!compact')
        span.price__title Starting from: 
        span(v-text='price + " €"').price__value

      v-btn(v-else color='secondary').custom.full-width.mt-3 Select hotel

                
</template>
<script>
export default {
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    image: String,
    title: String,
    stars: Number,
    regions: Array,
    props: Array,
    price: String
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/components/hotel-item.sass'

</style>

