<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") Settings
      el-breadcrumb-item Cities
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(inline)
          el-form-item
            el-button(type="primary" plain @click="create" :disabled="!can('cities.city')") Create
      el-table(:data="cities", @row-click="edit", v-loading="fetching")
        el-table-column(type="index", width="35px", align="right", class-name="text-muted")
        el-table-column(prop="name", label="City", :sortable="true")
        el-table-column(prop="parent.name", label="Region", :sortable="true")
      el-dialog(:visible.sync="modal")
        el-form(ref="form", :model="city", label-width="120px")
          el-form-item(label="City")
            el-input(v-model="city.name")
          el-form-item(label="Region")
            el-select(v-model="city.parent_id", placeholder="Region", :filterable="true")
              el-option(v-for="sd in regions", :label="sd.name", :value="sd.id", :key="sd.id")
        span.dialog-footer(slot="footer")
          el-button(type="primary", :plain="true", @click="save", :disabled="!saveable", :loading="saving") Create
          el-button(@click="modal = false", :plain="true") Close
</template>
<script type="text/javascript">
import Location from '@/models/Location'
export default {
  name: 'cities',
  data(){
    return {
      modal: false,
      saving: false,
      fetching: false,
      cities: [],
      regions: [],
      city: { name: '' }
    }
  },
  async created(){
    await this.fetch()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        let locations = await Location.whereIn('type', ['region', 'city']).include('parent').get()
        this.regions = locations.filter(l => l.type == 'region')
        this.cities = locations.filter(l => l.type == 'city')
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.city = new Location({ type: 'city', name: '', parent_id: null })
      this.modal = true
    },
    edit(row){
      this.city = row
      this.modal = true
    },
    async save(){
      try{
        this.saving = true
        await this.city.save()
        this.saving = false
        this.modal = false
        await this.fetch()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.saving = false
      }
    }
  },
  computed: {
    saveable: function(){
      return this.city.name.length && this.city.parent_id
    }
  }
}
</script>