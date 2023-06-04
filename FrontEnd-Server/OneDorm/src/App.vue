<script setup>
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
</script>

<template>
  <RouterView :key="useRoute().path"/>
</template>

<style scoped>
</style>
