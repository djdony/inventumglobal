<template lang="pug">
  v-card.compact.hotels__item(elevation='8')
    .hotel__quick-info
      .hotel__image(v-if="media.length > 0")
        img(:src="media[0].url" :alt='media[0].name')
      .hotel__info
        h3.info__title
          .hotel-stars
            span(v-text='star')
          span(v-text='name')

        .info__regions(v-text="`${location.parent.name} / ${location.name}`")

        .info__props
          .props__room-chars
            table
              tbody
                tr.props__item
                  td: b Total Area:
                  td: span(v-text='formatted_area + " m2"')
                tr.props__item
                  td: b Chain Scale:
                  td: span(v-if="chain" v-text='chain.name')

        .info__actions.compact
          v-btn.custom(color='secondary' small @click.stop="$router.push(`/hotel/${id}`)") Details
          v-btn.custom(color='primary' small @click.stop="addToCart") Select Hotel

</template>
<script>
    import Hotel from '@/models/Hotel'

    export default {
        methods: {
            addToCart() {
                this.$store.dispatch('cart/addHotel', {
                    hotel: { id: this.id, name: this.name, photo: this.photo, region: this.region   },
                    ...this.$route.query
                })
            },
        },
        props: {
          id: Number,
          name: String,
          star: String,
          chain: Object,
          formatted_area: String,
          location: Object,
          media: Array,
        },
        components: {},
    }
</script>
<style lang="sass">
  @import '@/assets/styles/components/hotel-item.sass'
  @import '@/assets/styles/components/hotel-stars.sass'
</style>

