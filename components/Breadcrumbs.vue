<template lang="pug">
  el-breadcrumb(separator-class="el-icon-arrow-right")
    el-breadcrumb-item(:to="{ name: 'dashboard' }")
      i.icon-display
    el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
    el-breadcrumb-item(:to="{ name: 'hotels' }") HOTELS
    el-breadcrumb-item {{ hotel.name }}
</template>