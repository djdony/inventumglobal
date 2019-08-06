<template lang="pug">
  v-card
    v-card-title Hotels
      v-spacer
      v-text-field(
      v-model="search"
      append-icon="mdi-search"
      label="Search"
      single-line
      hide-details
      )
    v-simple-table(fixed-header)
      thead
        tr
          th #
          th( v-for="h in datatable" :width="h.width") {{h.text}}
      tbody
        tr(v-for="hotel in $store.state.hotels" :key="hotel.id" @click="edit(hotel.id)")
          td {{hotel.id}}
          td {{hotel.name}}
          td {{hotel.location.name}}
          td {{hotel.star}}
          td {{hotel.email}}
          td {{hotel.www}}
          td {{hotel.phone}}
</template>
<script type="text/javascript">
  import Location from '@/models/Location'
  import Hotel from '@/models/Hotel'

  export default {
    name: 'hotels',
    data() {
      return {
        datatable: [
          {text: 'Hotel Name', width: '20%'},
          {text: 'Region', width: ''},
          {text: 'Star', width: ''},
          {text: 'Email', width: ''},
          {text: 'WWW', width: ''},
          {text: 'Telephone', width: ''},
        ],
        fetching: false,
        search: '',
        filters: {
          locations: []
        },
        cities: []
      }
    },
    async created() {
      await this.fetch()
      this.cities = await Location.where('type', 'city').get()
    },
    methods: {
      async fetch() {
        try {
          let hotels = await Hotel.include('location').select({
            hotels: ['id', 'name', 'details', 'location_id', 'email', 'www', 'telephone'],
            location: ['id', 'name']
          }).whereIn('location_id', this.filters.locations).get()
          await this.$store.dispatch('change', ['hotels', hotels])
        } catch (e) {
          console.log(e)
          this.fetching = false
        }
      },
      create() {
        this.$router.push({
          name: 'hotels-id',
          params: {id: 'new'}
        })
      },
      edit({id}) {
        this.$router.push({
          name: 'hotels-id',
          params: {id}
        })
      }
    }
  }
</script>
<style>
  th {
    text-align: left;
  }
</style>