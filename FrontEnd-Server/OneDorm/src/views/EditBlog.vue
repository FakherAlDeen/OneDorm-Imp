<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import BlogEdit from '../components/BlogEdit.vue';
import {useRoute} from "vue-router";


const BlogID = useRoute().params.BlogId;

</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <BlogEdit :BlogID="BlogID"/>
    </main>
</template>