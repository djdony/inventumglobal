<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Hotels
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(:inline="true" :model="filters")
          el-form-item(label="")
            el-button.ml-10(
              type="primary"
              size="mini"
              icon="el-icon-circle-plus-outline"
              @click="create"
              :plain="true"
            ) Create
          el-form-item(label="Region")
            el-select(v-model="filters.locations" multiple filterable @change="fetch")
              el-option(v-for="c in cities" :key="c.id" :value="c.id" :label="c.name")
      el-table(:data="$store.state.hotels" @row-click="edit" v-loading="fetching" size="mini")
        el-table-column(type="index" width="40px" class-name="text-muted" align="right")
        el-table-column(prop="name" label="Hotel" :sortable="true")
        el-table-column(prop="location.name" label="Region" :sortable="true")
        el-table-column(prop="details.star" label="Star" :sortable="true")
          template(v-slot="props")
            el-rate(
              v-if="props.row.details.hasOwnProperty('star')"
              :value="parseInt(props.row.details.star)"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :disabled="true"
            )
        el-table-column(prop="email" label="Email" :sortable="true")
        el-table-column(prop="www" label="Website" :sortable="true")
        el-table-column(prop="telephone" label="Phone" :sortable="true")
</template>
<script type="text/javascript">
import Location from '@/models/Location'
import Hotel from '@/models/Hotel'
export default {
  name: 'hotels',
  layout: 'element',
  data(){
    return {
      fetching: false,
      filters: {
        locations: []
      },
      cities: []
    }
  },
  async created(){
    await this.fetch()
    this.cities = await Location.where('type', 'city').get()
  },
  methods: {
    async fetch(){
      try {
        //this.fetching = true
        let hotels = await Hotel.include('location').select({
          hotels: ['id', 'name', 'details', 'location_id', 'email', 'www', 'telephone'],
          location: ['id', 'name']
        }).whereIn('location_id', this.filters.locations).get()
        await this.$store.dispatch('change', ['hotels', hotels])
        //this.fetching = false
      } catch (e) {
        console.log(e)
        //this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.$router.push({
        name: 'hotel',
        params: { id: 'new' }
      })
    },
    edit({ id }){
      this.$router.push({
        name: 'hotel',
        params: { id }
      })
    }
  }
}
</script>