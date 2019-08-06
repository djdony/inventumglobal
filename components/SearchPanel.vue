<template lang="pug">
  .search-panel
    .search-group
      .search-item.text 
        v-icon mdi-airplane-takeoff
        input(placeholder='From').input
        v-icon mdi-chevron-right
      .search-item.text 
        v-icon mdi-airplane-landing
        input(placeholder='To').input
        v-icon mdi-chevron-right
    .search-group
      v-menu(ref="menu" offset-y v-model="menu" transition="scale-transition"  :close-on-content-click="false")
          template(v-slot:activator="{ on }")
            .search-item.button(v-on='on')
              span.label Dates
              v-icon mdi-calendar-multiple
          v-date-picker(v-model="date" no-title width='266' y-offset)
            v-spacer
            v-btn(text color="primary" @click="menu = false") Cancel
            v-btn(text color="primary" @click="$refs.menu.save(date)") OK
      
      .search-item.button
        span.label Event size
        v-icon mdi-human-male
      .search-item.button.submit
        span.label Search
</template>

<script>
export default {
  data() {
    return {
      menu: null,
      date: null
    }
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/components/search-panel.sass'

</style>

