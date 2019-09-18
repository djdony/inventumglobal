<template lang="pug">
  v-card(elevation='8' :class='{compact }').hotels__item
    .hotel__quick-info
      .hotel__image
        img(:src="photo" alt='Hotel Image')
      .hotel__info
        h3.info__title
          .hotel-stars
            span(v-text='stars')
          span(v-text='name')
          v-spacer
          .hotel-package
            span(v-text='price.package')

        .info__regions(v-text="region")

        .info__props
          .props__room-chars
            table
              tbody
                tr.props__item
                  td: b Region:
                  td: span(v-text='region')
                tr.props__item
                  td: b Total Area:
                  td: span(v-text='area + " m2"')
                tr.props__item
                  td: b Chain Scale:
                  td: span(v-text='chain_id')

        .info__actions(:class='{compact}')
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
            compact: {
                type: Boolean,
                default: false
            },
            price: String,
            name: String,
            stars: Number,
            total_rooms: Number,
            largest_space: Number,
            regions: Array,
            props: Array,
            photo: String,
        },
        components: {},
    }
</script>
<style lang="sass">
  @import '@/assets/styles/components/hotel-item.sass'
  @import '@/assets/styles/components/hotel-stars.sass'
</style>

