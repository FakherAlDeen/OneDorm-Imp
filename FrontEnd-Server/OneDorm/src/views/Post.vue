<script setup>
import { ref } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
const postcont = ref("<p>My university is kinda hard and I was wondering if anyone would actually end up with a perfect GPA at the end of it all. </p><p><br></p><p>Wanted to hear your opinion about it!</p><p>Wanted to hear your opinion about it!</p>")
postcont.value=postcont.value.replaceAll('<p>', "<p class='text-lg my-1'>")
postcont.value=postcont.value.replaceAll('<br>', "")
console.log (postcont.value)
const Hashtags = ['#2312','#2312','#2312']
const up=ref(12);
const down =ref(13);
</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <PostContainer postTitle="Meow Meow" AnswerCount="122" :Hashtags="Hashtags" :PostContent="postcont" :DownVotes="down" :UpVotes="up"/>
    </main>
</template>