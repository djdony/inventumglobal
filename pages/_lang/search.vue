<template lang='pug'>
  v-content.search-page
    v-container

      //- SEARCH FORM PART

      v-layout(search-form-part wrap)
        v-flex(xs12)
          search-panel(@search='searchHotels' :hotelsAmount='hotelsAmount' search-params)

      v-layout(main-part)

        //- FILTERS

        v-flex(main-part__filters) 
          search-filters(@updateFilters='updateFilters' @search='searchHotels')

        v-flex(main-part__hotels)
          p(v-if='hotelsLoading').empty: v-progress-circular(indeterminate color="#F91C3D")
          p.empty(v-else-if='hotels.length == 0' v-text='hotelsMessage')

          //- HOTELS

          hotel-item(
            v-if="excHotels.length > 0"
            v-for='h in excHotels'
            :key='`h-${h.id}`'
            v-bind='h'
            :details="h.details || false"
            @show-details="showDetails"
          )

          hotel-item(
              v-if="topHotels.length > 0"
              v-for='t in topHotels'
              :key='`t-${t.id}`'
              v-bind='t'
              :details="t.details || false"
              @show-details="showDetails"
            )

          hotel-item(
            v-if="hotels.length > 0"
            v-for='(hotel, index) in hotels'
            :key='index'
            v-bind='hotel'
            :details="hotel.details || false"
            @show-details="showDetails"
          )

          v-spacer

        //- SIDE HOTELS

        v-flex(main-part__side-hotels)
          side-hotel(
            v-for='(hotel, index) in sideHotels'
            :key='index'
            v-bind='hotel'
            compact
          )

      v-layout(pagination justify-center v-if='pagination.total_pages > 1').mb-10
        v-pagination(v-model="pagination.current_page" :length="pagination.total_pages").custom
  
</template> 

<script>
import SearchPanel from '@/components/SearchPanel'
import HotelItem from '@/components/search/HotelItem'
import SideHotel from '@/components/search/SideHotel'
import SearchFilters from '@/components/search/SearchFilters'
import Hotel from '@/models/Hotel'
import { mapMutations } from 'vuex'
import pick from 'lodash.pick'

export default {
  data() {
    return {
      pagination: {
        per_page: 50,
        current_page: 1,
        total_pages: 1,
        total: 0
      },
      hotels: [],
      excHotels: [],
      topHotels: [],
      sideHotels: [],
      menu: null,
      date: null,
      hotelsMessage: 'Hotels will appear here',
      hotelsLoading: false
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

      return `${from} to ${to} of ${total} hotels`
    }
  },
  methods: {
    ...mapMutations({ showSnackbar: 'snackbar/showSnackbar' }),
    async searchHotels() {
      // timeout is needed as URL changing takes some time

      await setTimeout(async () => {
        this.hotelsLoading = true

        let { query } = this.$route

        try {
          const res = await this.$axios.get('/searchpackage', { params: query })
          this.pagination.per_page = res.data.per_page
          this.pagination.total_pages = Math.ceil(
            res.data.total / this.pagination.per_page 
          )
          this.pagination.total = res.data.total

          this.hotels = res.data.hotels.filter(h => h.category_id !== 'top' | h.category_id !== 'exc')
          this.excHotels = res.data.hotels.filter(h => h.category_id == 'exc')
          this.topHotels = res.data.hotels.filter(h => h.category_id == 'top')

          this.sideHotels = await Hotel.include('chain', 'location', 'location.parent', 'media', 'star', 'rooms')
            .where('category_id', 'exc')
            .limit(4)
            .get()

          if (this.hotels.length === 0)
            this.hotelsMessage = 'No hotels found. Try changing the filters'
        } catch (err) {
          this.hotelsLoading = false
          this.showSnackbar({
            message: 'An error occured while loading the data',
            color: 'red'
          })
        }

        this.hotelsLoading = false
      }, 1)
    },
    updateFilters(newFilters) {
      this.filters = newFilters
    },
    showDetails(id, show){
      this.excHotels.map(h => {
        if(h.id === id)
          h.details = show
        else
          h.details = false
        return h
      })
      this.hotels.map(h => {
        if(h.id === id)
          h.details = show
        else
          h.details = false
        return h
      })
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
    SearchFilters,
    SideHotel
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/pages/search.sass'

</style>
