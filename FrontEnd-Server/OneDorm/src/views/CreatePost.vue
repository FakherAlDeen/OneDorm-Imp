<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import PostCreate from '../components/PostCreate.vue';

</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <PostCreate></PostCreate>
    </main>
</template>