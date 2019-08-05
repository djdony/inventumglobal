<template lang="pug">
  el-menu(
    :default-active="activeRoute"
    mode="horizontal"
    menu-trigger="click"
    router
    @open="$emit('open')"
    @close="$emit('close')"
    @select="$emit('select')"
    :collapse-transition="false"
    unique-opened
    text-color="#111"
  )
    el-menu-item(index="dashboard" :route="{ name: 'dashboard' }") SEARCH
    el-submenu(:show-timeout="50" index="accounting" v-if="role('admin') && role('accountant')")
      template(slot="title") Muhasebe
      el-menu-item(index="invoices" :route="{ name: 'invoices' }") Faturalar
      el-menu-item(index="exchange-rates" :route="{ name: 'exchange-rates' }") Döviz kurları
      hr.sep
      el-menu-item(index="currencies" :route="{ name: 'currencies' }") Para birimleri
    el-submenu(:show-timeout="50" index="definitions" v-if="role('admin')")
      template(slot="title") Settings
      el-submenu(index="users")
        template(slot="title") Users
        el-menu-item(index="users" :route="{ name: 'users' }") Users
        hr.sep
        el-menu-item(index="roles" :route="{ name: 'roles' }") User Groups
        el-menu-item(index="permissions" :route="{ name: 'permissions' }") Permissions
        el-menu-item(index="multipermissions" :route="{ name: 'multipermissions' }" disabled) Multipermissions
      el-submenu(:show-timeout="50" index="locations")
        template(slot="title") Locations
        el-menu-item(index="countries" :route="{ name: 'countries' }") Countries
        el-menu-item(index="regions" :route="{ name: 'regions' }") Regions
        el-menu-item(index="cities" :route="{ name: 'cities' }") Cities
        el-menu-item(index="airports" :route="{ name: 'airports' }") Airports
      el-menu-item(index="hotels" :route="{ name: 'hotels' }") Hotels
      el-menu-item(index="companies" :route="{ name: 'companies' }") Companies
      el-menu-item(index="markets" :route="{ name: 'markets' }") Markets
      el-menu-item(index="agencies" :route="{ name: 'agencies' }") Agencies
      el-menu-item(index="suppliers" :route="{ name: 'suppliers' }") Suppliers
      el-menu-item(index="tours" :route="{ name: 'tours' }") Tours
      el-menu-item(index="vehicles" :route="{ name: 'vehicles' }") Vehicles
      el-menu-item(index="vehicle-models" :route="{ name: 'vehicle-models' }") Vehicle Models
      el-menu-item(index="vehicle-brands" :route="{ name: 'vehicle-brands' }") Vehicle Brands
    el-menu-item.pull-right(index="#logout" @click="logout" v-loading="loggingOut")
      i.icon-switch2
    el-menu-item.pull-right(index="#refresh" @click="clearCache" v-if="role('admin')")
      i.el-icon-refresh
    el-submenu.pull-right(:show-timeout="50" index="user" v-if="role('admin')")
      template(slot="title") {{ user.name }}
      el-menu-item(index="user-account" v-if="role('admin')" disabled) Profile
    el-menu-item.pull-right(index="#search" v-if="role('admin') && can('global.search')")
      el-popover(
        placement="bottom-end"
        width="400"
        trigger="click"
        @show=""
      )
        i.el-icon-search(slot="reference"  style="padding-bottom: 4px")
    el-menu-item.pull-right(index="#notifications" v-if="role('admin')")
      notifications
</template>
<script>
import Notifications from '@/components/Notifications' 
export default {
  name: 'main-nav',
  components: { Notifications },
  data(){
    return {
      loggingOut: false
    }
  },
  methods: {
    clearCache(){
      localStorage.clear()
      window.location.reload(true)
    },
    async logout(){
      this.loggingOut = true
      await axios.post('/logout')
      delete axios.defaults.headers.common.Authorization
      window.localStorage.removeItem('token')
      this.$store.state.user = {
        name: '',
        active: false,
        roles: [],
        permissions: [],
        hasPendingSurvey: false
      }
      this.loggingOut = false
      this.$router.go()
    },
    logs(){
      window.location.href = '/logs'
    },
    role(name){
      return this.user.roles.includes(name)
    }
  },
  computed: {
    user: function(){
      return this.$store.state.user
    },
    activeRoute: function(){
      return this.$route.name
    },
    isSupplier: function(){
      return this.role('supplier') && !this.role('admin')
    }
  }
}
</script>
<style>
  .el-menu--horizontal>.el-menu-item.is-active,.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  border-bottom: 1px solid #409eff;
  }
  .el-menu--horizontal>.el-menu-item,.el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 35px;
    line-height: 35px;
  }
  .el-submenu__title{
    padding: 0 10px;
  }
  .sep{
    margin: 3px 0;
    height: 1px;
    color: #eee;
  }
</style>