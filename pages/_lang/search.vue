<template lang='pug'>
  v-content.search-page
    v-container

      //- SEARCH FORM PART

      v-layout(search-form-part wrap)
        v-flex(xs12)
          search-panel
          .search-params
            v-spacer
            span.search-params__amount 1-25 of 1,000 Hotels
            span.search-params__sort.ml-3 
              span.mr-1 Sort by:
              v-menu(offset-y)
                template(v-slot:activator="{ on }")
                  span(v-on="on").select 
                    span.name Price
                      v-icon(size='20') mdi-chevron-down
                v-list(color='white')
                  v-list-item(@click='')
                    v-list-item-title Price
                  v-list-item(@click='')
                    v-list-item-title Stars

      v-layout(main-part)

        //- FILTERS

        v-flex(main-part__filters) 
          search-filters(@updateFilters='updateFilters')

        //- HOTELS

        v-flex(main-part__hotels)
          hotel-item(v-for='(hotel, index) in hotels' :key='index' v-bind='hotel')
          v-spacer

        //- SIDE HOTELS

        v-flex(main-part__side-hotels)
          hotel-item(v-for='(hotel, index) in sideHotels' :key='index' v-bind='hotel' compact)

      v-layout(pagination justify-center).mb-10
        v-pagination(v-model="pagination.current" :length="pagination.total").custom
  
</template>

<script>
import SearchPanel from '@/components/SearchPanel'
import HotelItem from '@/components/search/HotelItem'
import SearchFilters from '@/components/search/SearchFilters'

export default {
  data() {
    return {
      pagination: {
        current: 1,
        total: 5
      },
      hotels: [
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 5,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Meeting rooms', '25'],
            ['Total meeting space', '2,323 sq. m'],
            ['Largest room', '618 sq. m']
          ],
          price: '1,999'
        },
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 5,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Meeting rooms', '25'],
            ['Total meeting space', '2,323 sq. m'],
            ['Largest room', '618 sq. m']
          ],
          price: '1,999'
        },
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 5,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Meeting rooms', '25'],
            ['Total meeting space', '2,323 sq. m'],
            ['Largest room', '618 sq. m']
          ],
          price: '1,999'
        },
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 5,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Meeting rooms', '25'],
            ['Total meeting space', '2,323 sq. m'],
            ['Largest room', '618 sq. m']
          ],
          price: '1,999'
        },
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 5,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Meeting rooms', '25'],
            ['Total meeting space', '2,323 sq. m'],
            ['Largest room', '618 sq. m']
          ],
          price: '1,999'
        }
      ],
      sideHotels: [
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 4,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Total meeting space', '2,323 sq. m']
          ],
          price: '1,999'
        },
        {
          title: 'TITANIC MARDAN PALACE',
          image: '/img/home/ecommerce.png',
          stars: 4,
          regions: ['Turkey', 'Antalya', 'Aksu'],
          props: [
            ['Guest rooms', '1,025'],
            ['Total meeting space', '2,323 sq. m']
          ],
          price: '1,999'
        }
      ],
      menu: null,
      date: null,
      filters: {}
    }
  },
  created() {},
  methods: {
    updateFilters(newFilters) {
      console.log(newFilters)
      this.filters = newFilters
    }
  },
  components: {
    SearchPanel,
    HotelItem,
    SearchFilters
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/pages/search.sass'

</style>
