<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item SETTINGS
    el-alert(type="warning" center :closable="false" show-icon title="SAYFA YAPIM AŞAMASINDA")
    center
      img(src="/images/maintenance.gif" style="height:400px;margin-top:100px")
</template>
<script>
export default {
  name: 'definitions'
}
</script>
