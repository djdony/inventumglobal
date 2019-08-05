<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Suppliers
    el-card(
      body-style="padding: 0"
      v-loading="fetching"
    )
      div(slot="header")
        el-form.pt-10(inline :model="filters")
          el-form-item
            el-button(
              @click="createSupplier"
              icon="el-icon-circle-plus-outline"
              :disabled="!can('suppliers.edit')"
            ) Create
          el-form-item.pull-right
            el-input(
              placeholder="Ara..."
              v-model="search"
            )
              i.el-input__icon.el-icon-search(slot="suffix")
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import set from 'lodash/set'
import Company from '@/models/Company'
import Type from '@/models/Type'
import Location from '@/models/Location'
export default {
	name: 'suppliers',
	data(){
		return {
			activePane: 'general',
      search: '',
      activeTab: 'suppliers',
			supplier: {
				name: '',
				details: {
          authoritative: ''
        },
        shop: false,
        type: 'supplier',
        own: false
			},
      locations: [],
			modal: false,
      suppliers: [],
      fetching: true,
      saving: false
		}
	},
  async mounted(){
    this.suppliers = await Company.where('type', 'supplier').get()
    this.fetching = false
  },
	methods: {
		createSupplier(){
			this.supplier = new Company({
        name: '',
        type: 'supplier',
        details: {
          authoritative: '',

        },
        locations: []
      })
			this.activePane = 'general'
			this.modal = true
		},
		async editSupplier(row){
      this.supplier = await Company.include('locations').find(row.id)
      this.supplier.locations = this.supplier.locations.map(s => s.id)
			if(this.activePane === null){
				this.activePane = 'general'
			}
			this.modal = true
		},
		async saveSupplier(){
      this.saving = true
      await this.supplier.save()
      this.saving = false
		},
    async toggleSupplierActive(supplier){

    }
	},
	computed: {

	}
}
</script>