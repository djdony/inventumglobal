<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'accounting' }") MUHASEBE
      el-breadcrumb-item PARA BİRİMLERİ
    el-card(body-style="padding:0")
      el-table(size="mini", :data="currencies", v-loading="fetching")
        el-table-column(type="index", width="35px", align="right", class-name="text-muted")
        el-table-column(prop="id", label="Kod", :sortable="true")
        el-table-column(prop="name", label="Açıklama", :sortable="true")
        el-table-column(prop="symbol", label="Sembol", :sortable="true")
        el-table-column(prop="main", label="Varsayılan", :sortable="true")
          template(slot-scope="props") {{ props.row.main ? 'Evet' : 'Hayır' }}
        el-table-column(prop="active", label="Aktif", :sortable="true")
          template(slot-scope="props") {{ props.row.active ? 'Evet' : 'Hayır' }}
        el-table-column(prop="account_code", label="Sedna hesap kodu", :sortable="true")
</template>
<script>
import Currency from '@/models/Currency'
import { mapGetters } from 'vuex'
export default {
  name: 'currencies',
  data () {
    return {
      currencies: [],
      fetching: false
    }
  },
  async created(){
    try{
      this.fetching = true
      this.currencies = await Currency.get()
      this.fetching = false
    }catch({ response }){
      this.$message.error(response.data.message)
      this.fetching = false
    }
  }
}
</script>