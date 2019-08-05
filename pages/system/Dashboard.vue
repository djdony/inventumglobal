<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item
        i.icon-display
      el-breadcrumb-item SEARCH PACKAGE
    search-form
</template>
<script>
import SearchForm from '@/components/agency/SearchForm'
export default {
  layout: 'element',
  name: 'dashboard',
  components: { SearchForm }
}
</script>