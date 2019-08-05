<template lang="pug">
    el-card(body-style="padding: 0", shadow="hover")
        div(slot="header"  style="background-image: url('/img/header.jpg');background-repeat: no-repeat; background-size: cover;")
            center()
                el-form.pt-10(:inline="false", :model="filters" label-width="150px" style="width: 400px")
                    el-form-item(label="From")
                        el-select(size="mini" v-model="filters.from" placeholder="Departure Airport" style="width: 100%" filterable clearable @change="fetchToLocations")
                            el-option-group(v-for="g in fromLocations" :label="g.name" :value="g.id" :key="g.id")
                                el-option(v-for="f in g.descendants" :label="f.name" :value="f.id" :key="f.id")
                    el-form-item(label="To")
                        el-select(v-model="filters.to" placeholder="Arrival Airport" size="mini" style="width: 100%" filterable clearable :disabled="toLocations.length === 0 || !filters.from")
                            el-option-group(v-for="g in toLocations" :label="g.name" :value="g.id" :key="g.id")
                                el-option(v-for="f in g.descendants" :label="f.name" :value="f.id" :key="f.id")
                    el-form-item(label="Departure Date")
                        el-date-picker(
                        v-model="filters.arrival_date"
                        type="date"
                        placeholder="Choose departure date"
                        style="width: 100%"
                        format="dd.MM.yyyy"
                        value-format="yyyy-MM-dd"
                        @change="addDays(3)"
                        )
                    el-form-item(label="Return Date")
                        el-date-picker(
                        v-model="filters.departure_date"
                        type="date"
                        placeholder="Choose return date"
                        style="width: 100%"
                        format="dd.MM.yyyy"
                        value-format="yyyy-MM-dd"
                        readonly
                        )
                    el-form-item(label="Room type")
                        el-select(v-model="filters.room_type" placeholder="Select Room Type" size="mini" style="width: 100%" filterable)
                          el-option(v-for="t in roomTypes" :label="t.name" :value="t.id" :key="t.id")
                    el-form-item(label="Price Type")
                        el-radio-group(v-model="filters.purpose")
                            el-radio-button(label="m") M.I.C.E
                            el-radio-button(label="w") WEDDING
                    el-form-item
                        el-button(
                          size="medium"
                          type="primary"
                          @click="search"
                          :loading="searching"
                          icon="el-icon-search"
                          :disabled="!searchable"
                        ) SEARCH
        el-card(body-style="padding: 0", shadow="hover")
            div(slot="header")
                el-form.pt-10(:inline="true")
                    el-form-item
                        el-button(
                          :disabled="selected.length === 0 || selected.length > 5"
                          type="success"
                          icon="el-icon-finished"
                          @click="orderModal = true"
                        )
                            | MAKE REQUEST
                            span(v-if="selected.length > 0") &nbsp;| {{ selected.length }}
                    el-form-item
                      el-input(
                        v-model="searchString"
                        placeholder="Filter results"
                        v-if="results.length > 0"
                        prefix-icon="el-icon-search"
                      )
            el-table(
              :data="filteredResults"
              stripe
              @selection-change="selected = $event"
              v-loading="searching"
            )
                el-table-column(type="selection")
                el-table-column(prop="hotel" label="Hotel" sortable)
                el-table-column(prop="package" label="Package" sortable width="130px" align="right")
                el-table-column(prop="landing" label="Land Package" sortable width="130px" align="right")
                el-table-column(prop="prepost" label="Pre-post" sortable width="130px" align="right")
                el-table-column(prop="currency" label="Currency" sortable width="130px" align="center")
                el-table-column(prop="prepost" label="Operations" width="130px")
                  template(v-slot="props")
                    el-button(
                      @click="showDetails(props.row)"
                      type="primary"
                      size="mini"
                      icon="el-icon-tickets"
                    ) Details
            el-pagination.mt-10.mb-40(
              v-if="results.length > 0"
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="per_page"
              :total="total"
              @current-change="search"
              @prev-click="search"
              @next-click="search"
            )
        el-drawer(
          title="MAKE A REQUEST"
          :visible.sync="orderModal"
          direction="rtl"
        )
          el-form.p-10(:inline="false" :model="order" label-width="140px" )
            el-form-item(label="Single rooms")
              el-input(v-model="order.single" type="number" style="width: 100%" @input="recalc")
            el-form-item(label="Double rooms")
              el-input(v-model="order.double" type="number" style="width: 100%" @input="recalc")
            el-form-item(label="Triple rooms")
              el-input(v-model="order.triple" type="number" style="width: 100%" @input="recalc")
            el-form-item(label="Total Pax")
              el-input(v-model="order.pax" type="number" style="width: 100%" @input="recalc('pax')")
            el-form-item(label="Leave a Message")
              el-input(
                v-model="order.message"
                type="textarea"
                :rows="7"
                :maxlength="250"
                show-word-limit
              )
            el-form-item
              el-button(
                type="primary"
                @click="sendOrder"
                :loading="sending"
                :disabled="!order.pax > 0"
              ) SEND REQUEST
        el-dialog(:visible.sync="detailsModal" :title="details.hotel" top="20px" center)
          span
            img(class="image" :src="`/img/hotels/${details.id}.jpg`" style="max-width: 100%;")
</template>
<script>
  import Location from '@/models/Location'
  import Hotel from '@/models/Hotel'
  import Order from '@/models/Order'
  export default {
    name: 'search-form',
    data(){
      return {
        filters: {
          from: null,
          to: null,
          arrival_date: "2019-11-01",
          departure_date: "2019-11-04",
          purpose: 'w',
          room_type: 'dbl',
          page: 1
        },
        roomTypes: [
          { id: 'sng', name: 'Per Person in SNG Room' },
          { id: 'dbl', name: 'Per Person in DBL Room' },
          { id: 'trpl', name: 'Per Person in TRP Room' }
        ],
        total: 0,
        per_page: 10,
        fromLocations: [],
        toLocations: [],
        results: [],
        searching: false,
        sending: false,
        orderModal: false,
        detailsModal: false,
        selected: [],
        searchString: '',
        details: { name: '' },
        order: new Order({
          message: '',
          single: 0,
          double: 0,
          triple: 0,
          pax: 0,
          hotels: []
        })
      }
    },
    async created(){
      this.fromLocations = await Location.custom('user/airports').get()
    },
    methods: {
      async search(page){
        this.searching = true
        if(page > 0) this.filters.page = page
        try{
          let { data } = await axios.get('/searchpackage', { params: this.filters })
          this.results = data.hotels
          this.per_page = data.per_page
          this.total = data.total
          this.searching = false
        }catch(e){
          this.searching = false
          this.$message.error('SORRY, WE ARE UNABLE TO FINISH YOUR REQUEST')
        }
      },
      async fetchToLocations(){
        this.toLocations = await Location.custom('user/destinations').get()
      },
      async sendOrder() {
        try{
          this.sending = true
          this.order.hotels = this.selected.map(s => s.id)
          await this.order.save()
          this.sending = false
          this.orderModal = false
          this.$message.success('YOUR ORDER HAS BEEN SAVED. THANK YOU')
        }catch(e){
          this.sending = false
          this.$message.error('SORRY, WE ARE UNABLE TO SEND YOUR REQUEST')
        }
      },
      addDays(n){
        this.filters.departure_date = moment(this.filters.arrival_date).add(3, 'd').format('YYYY-MM-DD')
      },
      recalc(e){
        if(e == 'pax'){
          this.order.single = 0
          this.order.double = this.order.pax > 0 ? Math.ceil(this.order.pax/2) : 0
          this.order.triple = 0
        }else{
          this.order.pax = Number(this.order.single)+Number((this.order.double*2))+Number((this.order.triple*3))
        }
      },
      showDetails(hotel){
        this.details = hotel
        this.detailsModal = true
      }
    },
    computed: {
      searchable: function(){
        return this.filters.from && this.filters.to && this.filters.arrival_date
      },
      filteredResults: function(){
        if(this.results.length > 0){
          return this.results.filter(u => u.hotel && u.region
            ? u.hotel.toLowerCase().includes(this.searchString.toLowerCase()) || u.region.toLowerCase().includes(this.searchString.toLowerCase())
            : false
          )
        }else{
          return []
        }
      }
    },
    watch: {
      selected: {
        deep: true,
        handler: function(val){
          if(val.length > 5){
            this.$message.error('YOU CAN SELECT MAXIMUM 5 HOTELS')
          }
        }
      }
    }
  }
</script>
<style>
</style>