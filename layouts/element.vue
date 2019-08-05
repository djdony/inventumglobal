<template lang="pug">
  #app(:style="menuOpened ? 'opacity: 0.5' : ''")
    keep-alive
    main-nav(
    @open="menuOpened = true"
    @close="menuOpened = false"
    @select="menuOpened = false"
    v-if="logged && user.active"
    )
    nuxt(v-if="logged && user.active")
</template>
<script>
  import MainNav from '@/components/MainNav'
  import Login from '@/components/Login'
  export default {
    name: 'app',
    components: {
      MainNav,
      Login
    },
    data(){
      return {
        menuOpened: true
      }
    },
    computed: {
      user: function(){
        conole.log(this.$store.state.auth.user)
        return this.$store.state.auth.user
      },
      logged: function(){
        return this.$store.state.auth.loggedIn
      }
    }
  }
</script>