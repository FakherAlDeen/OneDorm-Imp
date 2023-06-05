<script setup>
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
</script>

<template>
  <RouterView :key="useRoute().params[useRoute().meta.watchParam]"/>
</template>

<style scoped>
</style>
