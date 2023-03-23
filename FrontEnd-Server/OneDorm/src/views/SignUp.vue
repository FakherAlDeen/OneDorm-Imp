<script setup>
import HeaderSignLog from '../components/HeaderSignLog.vue'
import {PageStore} from '../stores/PageStore'
const Store = PageStore();
Store.ChangePage('Sign Up')
console.log (Store.Page)
</script>

<template>
  <main class="w-full h-full flex-1 flex-col">
    <HeaderSignLog/>
    <!-- <p>{}</p> -->
  </main>
</template>
