<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import BlogCreate from '../components/BlogCreate.vue';

</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <BlogCreate></BlogCreate>
    </main>
</template>