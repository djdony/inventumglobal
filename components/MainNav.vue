<template lang="pug">
  el-menu(
    :default-active="activeRoute"
    mode="horizontal"
    menu-trigger="click"
    router
    :collapse-transition="false"
    unique-opened
    text-color="#111"
  )
    el-menu-item(index="dashboard" :route="{ name: 'dashboard' }")
    el-submenu(:show-timeout="50" index="definitions" v-if="role('admin')")
      template(slot="title") Settings
      el-submenu(index="users")
        template(slot="title") Users
        el-menu-item(index="users" :route="{ name: 'users' }") Users
        hr.sep
      el-submenu(:show-timeout="50" index="locations")
        template(slot="title") Locations
        el-menu-item(index="countries" :route="{ name: 'countries' }") Countries
        el-menu-item(index="regions" :route="{ name: 'regions' }") Regions
        el-menu-item(index="cities" :route="{ name: 'cities' }") Cities
        el-menu-item(index="airports" :route="{ name: 'airports' }") Airports
      el-menu-item(index="hotels" :route="{ name: 'hotels' }") Hotels
      el-menu-item(index="companies" :route="{ name: 'companies' }") Companies
      el-menu-item(index="agencies" :route="{ name: 'agencies' }") Agencies
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
  }
}
</script>
<style>
</style>