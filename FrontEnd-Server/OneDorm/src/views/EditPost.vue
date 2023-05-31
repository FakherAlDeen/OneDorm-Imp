<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { ref,onMounted, onBeforeMount } from 'vue'
import PostEdit from '../components/PostEdit.vue';
import {useRoute} from "vue-router";
import { GetPost } from '../Helpers/APIs/PostAPIs';

const PostID = useRoute().params.QuestionId;
const postTitle = ref('')
const postcont = ref('')
const Hashtags = ref([])
const Error = ref ("smth");

let PostData = 0;

console.log('postdata',PostData)
onBeforeMount(async()=>{
    PostData = await GetPost(PostID);
    if (PostData.status !='200') {Error.value=PostData.data; return}
    console.log (PostData);
    Error.value="nth";
    PostData = PostData.data
    
    
    postTitle.value = PostData.PostData.QuestionTitle;
    postcont.value = PostData.PostData.QuestionDetailsHTML;
    postcont.value=postcont.value.replaceAll('<p>', "<p class='text-lg my-1'>");
    postcont.value=postcont.value.replaceAll('<br>', "");
    Hashtags.value = PostData.PostData.Hashtags;
    // console.log('b33' , Hashtags.value , postTitle.value , postcont.value)
})

</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <PostEdit :PostID="PostID" :postTitle="postTitle" :Hashtags="Hashtags" :PostContent="postcont" />
    </main>
</template>