<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Markets
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10
          el-form-item
            el-button(
              icon="el-icon-circle-plus-outline"
              @click="create"
              :plain="true"
              type="primary"
              size="mini"
              :disabled="!can('markets.create')"
            ) Create
      el-table(:data="markets", @row-dblclick="edit", v-loading="fetching", size="mini" stripe)
        el-table-column(type="index", class-name="text-muted", width="30" align="right")
        el-table-column(prop="name", label="Pazar", sortable)
        el-table-column(prop="company.name", label="Şirket", sortable)
    el-dialog(:visible.sync="modal", :title="market.name", :center="true", top="20px" width="400px")
      el-form(ref="form", :model="market", label-width="120px")
        el-form-item(label="Market")
          el-input(v-model="market.name")
        el-form-item(label="Şirket")
          el-select(v-model="market.company_id", placeholder="Şirket seçiniz", :filterable="true" style="width:100%")
            el-option(v-for="company in $store.state.companies", :label="company.code", :value="company.id", :key="company.id")
      span.dialog-footer(slot="footer")
        el-button(type="primary", @click="save", :disabled="!saveable", :loading="saving") Create
        el-button(@click="modal = false", :plain="true") Close
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
import Market from '@/models/Market'
export default {
  name: 'markets',
  data(){
    return {
      modal: false,
      fetching: false,
      saving: false,
      markets: [],
      market: { name: '' },
    }
  },
  async created(){
    await this.fetch()
  },
  methods: {
    async fetch(){
      this.fetching = true
      this.markets = await Market.include('company').orderBy('company_id').get()
      this.fetching = false
    },
    create(){
      this.market = new Market({ name: '' })
      this.modal = true
    },
    edit(market){
      this.market = market
      this.modal = true
    },
    async save(){
      try{
        this.saving = true
        await this.market.save()
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
    ...mapState(['companies', 'user']),
    saveable: function(){
      return this.market.name != '' && this.market.name != null && this.market.company_id != null
    }
  }
}
</script>