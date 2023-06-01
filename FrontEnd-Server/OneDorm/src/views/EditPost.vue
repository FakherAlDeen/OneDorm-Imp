<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { ref,onMounted, onBeforeMount } from 'vue'
import PostEdit from '../components/PostEdit.vue';
import {useRoute} from "vue-router";


const PostID = useRoute().params.QuestionId;

</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <PostEdit :PostID="PostID"/>
    </main>
</template>