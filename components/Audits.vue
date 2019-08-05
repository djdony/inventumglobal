<template lang="pug">
    div
        el-alert(type="warning" center :closable="false" show-icon title="YAPIM AŞAMASINDA")
        center
            img(src="/images/maintenance.gif" style="height:400px;margin: 50px auto")
</template>
<script>
import Audit from '@/models/Audit'
export default {
  name: 'audits',
  data () {
    return {

    }
  }
}
</script>