<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Regions
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(inline)
          el-form-item
            el-button(type="primary" plain @click="create" :disabled="!can('regions.create')") Create
      el-table(:data="regions", @row-click="edit", v-loading="fetching")
        el-table-column(type="index", width="30px", class-name="text-muted", align="right")
        el-table-column(prop="name", label="Region", :sortable="true")
        el-table-column(prop="parent.name", label="Country", :sortable="true")
      el-dialog(:visible.sync="modal", :title="region.name", :center="true", width="400px", top="20px")
        el-form(ref="form", :model="region", label-width="120px")
          el-form-item(label="Region")
            el-input(v-model="region.name")
          el-form-item(label="Country")
            el-select(v-model="region.parent_id", placeholder="Choose country", :filterable="true", style="width:100%")
              el-option(v-for="sd in countries", :label="sd.name", :value="sd.id", :key="sd.id")
        span.dialog-footer(slot="footer")
          el-button(type="primary", :plain="true", @click="save", :disabled="!saveable", :loading="saving") Create
          el-button(@click="modal = false", :plain="true") Close
</template>
<script type="text/javascript">
import Location from '@/models/Location'
export default {
  name: 'regions',
  data(){
    return {
      modal: false,
      saving: false,
      fetching: false,
      regions: [],
      countries: [],
      region: new Location({ name: '' })
    }
  },
  async created(){
    await this.fetch()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        let locations = await Location.whereIn('type', ['country', 'region']).include('parent').get()
        this.countries = locations.filter(l => l.type == 'country')
        this.regions = locations.filter(l => l.type == 'region')
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.region = new Location({ type: 'region', name: '' })
      this.modal = true
    },
    edit(row){
      this.region = row
      this.modal = true
    },
    async save(){
      try{
        this.saving = true
        await this.region.save()
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
      return this.region.name.length && this.region.parent_id
    }
  }
}
</script>