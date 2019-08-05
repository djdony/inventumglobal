<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'accounting' }") MUHASEBE
      el-breadcrumb-item TCMB DÖVİZ KURLARI
    el-card(body-style="padding:0")
      el-form.pt-10(slot="header" inline v-model="filters")
        el-form-item(label="Tarih aralığı")
          el-date-picker(
            v-model="filters.period"
            type="daterange"
            :clearable="false"
            unlink-panels
            start-placeholder="Başlangıç"
            end-placeholder="Bitiş"
            format="dd.MM.yyyy"
            value-format="yyyy-MM-dd"
            :picker-options="dateranges"
            @change="fetch"
          )
      el-table(:data="rates", size="mini")
        el-table-column(prop="date", label="Tarih", align="center", :sortable="true")
          template(v-slot="props") {{ props.row.date|moment('DD.MM.YYYY') }}
        template(v-for="currency in currencies")
          el-table-column(:label="currency.id", align="center")
            el-table-column(:prop="`rates[${currency.id}].buy`", :key="`buy-${currency.id}`", label="Alış", align="center")
              template(v-slot="props")
                span(v-if="props.row.rates.hasOwnProperty(currency.id) && props.row.rates[currency.id].hasOwnProperty('buy')")
                  | {{ props.row.rates[currency.id].buy.toFixed(4) }}
                span.text-danger(v-else) 0
            el-table-column(:prop="`rates[${currency.id}].sell`", :key="`sell-${currency.id}`", label="Alış", align="center")
              template(v-slot="props")
                span(v-if="props.row.rates.hasOwnProperty(currency.id) && props.row.rates[currency.id].hasOwnProperty('sell')")
                  | {{ props.row.rates[currency.id].sell.toFixed(4) }}
                span.text-danger(v-else) 0
</template>
<script>
import Currency from '@/models/Currency'
import ExchangeRate from '@/models/ExchangeRate'
export default {
  name: 'exchange-rates',
  data () {
    return {
      currencies: [],
      rates: [],
      fetching: false,
      filters: {
        period: [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      },
      dateranges: {
        firstDayOfWeek: 1,
        format: 'dd.MM.yyyy HH:mm',
        shortcuts: [{
          text: 'Son 3 ay',
          onClick(picker) {
            const start = moment().subtract(3, 'M').startOf('day').toDate()
            const end = moment().endOf('day').toDate()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Son 1 ay',
          onClick(picker) {
            const start = moment().subtract(1, 'M').startOf('day').toDate()
            const end = moment().endOf('day').toDate()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Son 7 gün',
          onClick(picker) {
            const start = moment().subtract(1, 'w').startOf('day').toDate()
            const end = moment().endOf('day').toDate()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Dün',
          onClick(picker) {
            const start = moment().subtract(1, 'd').startOf('day').toDate()
            const end   = moment().subtract(1, 'd').endOf('day').toDate()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Bugün',
          onClick(picker) {
            const start = moment().startOf('day').toDate()
            const end = moment().endOf('day').toDate()
            picker.$emit('pick', [start, end])
          }
          }, {
          text: 'Yarın',
          onClick(picker) {
            const start = moment().add(1, 'd').startOf('day').toDate()
            const end = moment().add(1, 'd').endOf('day').toDate()
            picker.$emit('pick', [start, end])
          }
          }
        ]
      }
    }
  },
  async created(){
    this.currencies = await Currency.where('main', false).select('id').get()
    await this.fetch()
  },
  methods: {
    async fetch(){
      this.fetching = true
      this.rates = await ExchangeRate.whereIn('period', this.filters.period).get()
      this.fetching = false
    }
  }
}
</script>