<template lang='pug'>
  v-content.search-page
    v-container

      //- SEARCH FORM PART

      v-layout(search-form-part wrap)
        v-flex(xs12)
          search-panel(@search='searchHotels' @hotelsAmount='hotelsAmount')

      v-layout(main-part)

        //- FILTERS

        v-flex(main-part__filters) 
          search-filters(@updateFilters='updateFilters' @search='searchHotels')

        //- HOTELS

        v-flex(main-part__hotels)
          p.empty(v-if='hotels.length == 0' v-text='hotelsMessage')
          hotel-item(v-else v-for='(hotel, index) in hotels' :key='index' v-bind='hotel')
          v-spacer

        //- SIDE HOTELS

        v-flex(main-part__side-hotels)
          hotel-item(v-for='(hotel, index) in sideHotels' :key='index' v-bind='hotel' compact)

      v-layout(pagination justify-center).mb-10
        v-pagination(v-model="pagination.current_page" :length="pagination.total_pages").custom
  
</template>

<script>
import SearchPanel from '@/components/SearchPanel'
import HotelItem from '@/components/search/HotelItem'
import SearchFilters from '@/components/search/SearchFilters'
import Hotel from '@/models/Hotel'
import _ from 'lodash'

export default {
  data() {
    return {
      pagination: {
        per_page: 50,
        current_page: 1,
        total_pages: 1
      },
      hotels: [],
      sideHotels: [],
      menu: null,
      date: null,
      hotelsMessage: 'Hotels will appear here'
    }
  },
  created() {
    if (this.$route.query.searchPanel) this.searchHotels()
  },
  computed: {
    hotelsAmount() {
      let pag = this.pagination

      let from = (pag.current_page - 1) * pag.per_page + 1
      let to = from + this.hotels.length - 1
      let total = pag.total

      return `${from} to ${to} of ${total} Hotels`
    }
  },
  methods: {
    async searchHotels() {
      // timeout is need as URL changing takes some time
      setTimeout(async () => {
        try {
          let { query } = this.$route
          const res = await this.$axios.get('/searchpackage', { params: query })
          console.log(res)

          this.pagination.per_page = res.data.per_page
          this.pagination.total_pages = Math.ceil(
            res.data.total / this.pagination.per_page
          )

          this.hotels = res.data.hotels
          if (this.hotels.length == 0)
            this.hotelsMessage = 'No hotels found. Try changing the filters'
        } catch ({ response }) {
          // this.$message.error(response.data.message)
          console.log(response)
        }
      }, 1)
    },
    updateFilters(newFilters) {
      console.log(newFilters)
      this.filters = newFilters
    }
  },
  watch: {
    'pagination.current_page'(newVal) {
      let query = { ...this.$route.query }
      query.page = newVal

      this.$router.push({ path: '/search', query })

      this.searchHotels()
      window.scrollTo(0, 0)
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
