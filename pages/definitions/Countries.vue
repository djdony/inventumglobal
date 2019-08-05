<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item COUNTRIES
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10.ml-10(inline)
          el-form-item
            el-button(type="primary" plain @click="create") Create
      el-table(:data="countries" @row-click="edit" v-loading="fetching")
        el-table-column(type="index" width="30px" class-name="text-muted" align="right")
        el-table-column(prop="name" label="Country" :sortable="true")
      el-dialog(:visible.sync="modal" :title="country.name" center width="400px")
        el-form(ref="form" v-model="country" label-width="120px")
          el-form-item(label="Country")
            el-input(v-model="country.name")
        span.dialog-footer(slot="footer")
          el-button(
            type="primary"
            :plain="true"
            @click="save"
            :disabled="!country.name.length"
            :loading="saving"
          ) Save
          el-button(@click="modal = false", :plain="true") Close
</template>
<script type="text/javascript">
import Location from '@/models/Location'
export default {
  name: 'countries',
  data(){
    return {
      modal: false,
      saving: false,
      fetching: false,
      countries: [],
      country: new Location({ name: '' })
    }
  },
  async created(){
    await this.fetch()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        this.countries = await Location.where('type', 'country').get()
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.country = new Location({ type: 'country', name: '' })
      this.modal = true
    },
    async edit(row){
      try{
        this.country = await Location.find(row.id)
        this.modal = true
      }catch({ response }){
        this.$message.error(response.data.message)
      }
    },
    async save(){
      try{
        this.saving = true
        await this.country.save()
        this.saving = false
        this.modal = false
        await this.fetch()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.saving = false
      }
    }
  }
}
</script>