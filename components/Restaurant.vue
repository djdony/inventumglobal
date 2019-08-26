<template lang="pug">
  v-simple-table(dense)
    thead
      tr
        th Name
        th Food Included
        th Drinks Included
        th Type
    tbody
      tr(v-for="rst in restaurants" :key="rst.id")
        td(v-text="rst.name")
        td(v-text="rst.food ? 'Included' : 'Extra'")
        td(v-text="rst.drinks  ? 'Included' : 'Extra'")
        td(v-text="rst.type_id")
</template>

<script>
export default {
  props: {
    restaurants: {
      type: Array,
      default: []
    }
  }
}
</script>