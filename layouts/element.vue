<template lang="pug">
  div
    keep-alive
    main-nav(
      v-if="logged && user.active"
    )
    nuxt(v-if="logged && user.active")
</template>
<script>
  import MainNav from '@/components/MainNav'
  export default {
    components: {
      MainNav
    },
    computed: {
      user: function(){
        return this.$store.state.auth.user
      },
      logged: function(){
        return this.$store.state.auth.loggedIn
      }
    }
  }
</script>
