<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Companies
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(inline)
          el-form-item
            el-button(type="primary" plain @click="create") Create
      el-table(:data="companies" style="width: 100%" v-loading="fetching")
        el-table-column(type="index" width="30px" class-name="text-muted" align="right")
        el-table-column(prop="name" label="Company")
        el-table-column(prop="details.phone" label="Telephone")
        el-table-column(prop="details.address" label="Adress")
        el-table-column(prop="details.website" label="Website")
      el-dialog(:visible.sync="modal" :title="company.name" center width="400px")
          el-form(ref="form", :model="company", label-width="120px")
              el-form-item(label="Name")
                  el-input(v-model="company.name")
              el-form-item(label="Phone")
                  el-input(v-model="company.details.phone")
          el-form-item(label="Adress")
                  el-input(v-model="company.details.adress")
          el-form-item(label="Website")
                  el-input(v-model="company.details.phone")
          span.dialog-footer(slot="footer")
              el-button(type="primary", :plain="true", @click="save", :disabled="!company.name.length" :loading="saving") Create
              el-button(@click="modal = false", :plain="true") Close
</template>
<script>
import Company from '@/models/Company'
export default {
  name: 'companies',
  data(){
    return {
      fetching: false,
      saving: false,
      modal: false,
      companies: [],
      company: new Company({
        name: '',
        details: {phone: ''}
      })
    }
  },
  async created(){
    await this.fetch()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        this.companies = await Company.where('type_id', 'details', 'company').$get()
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.company = new Company({ type: 'company', name: '' })
      this.modal = true
    },
    edit(row){
      this.company = row
      this.modal = true
    },
    async save(){
      try{
        this.saving = true
        await this.company.save()
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