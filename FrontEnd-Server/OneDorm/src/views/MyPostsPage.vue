<script setup>
import { ref,onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import { UserStore } from '../stores/UserStore';
import router from '../router';
import { GetUserPosts } from '../Helpers/APIs/UserAPIs';
import PostContainer from '../components/PostContainer.vue';
const Loading = ref (true);
const PostsList = ref ([]);
onBeforeMount(async ()=>{
    const posts = await GetUserPosts(UserStore().UserID);
    PostsList.value = posts.data;
    Loading.value = false;
})
const turnfun= (e)=>{
    e=e.replaceAll('<p>', "<p class='text-lg my-1 font-extrabold'>");
    e=e.replaceAll('<br>', "");
    return e;
};
const ClickHanlder = (e)=>{
router.push ({
    name: 'Post',
    params: {
        QuestionId: e,
    }
})}
</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <template v-if="Loading">
            <div class="flex">
                <button class="m-auto btn btn-square loading"></button>
            </div>
        </template>
        <template v-else>
            <div class="w-5/6 h-full mx-auto mt-10">
                <div class="">
                    <div class="w-1/2 mx-auto border-b-4 border-Grey pb-3">
                        <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8">YOUR POSTS</h2>
                    </div>
                    <template v-for="(e) in PostsList" :key="e.QuestionId">
                            <PostContainer @click="ClickHanlder(e.QuestionId)" 
                            class="post w-full cursor-pointer transition ease-in-out hover:scale-105" 
                            :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" 
                            :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" 
                            :postFull="false" :mine="e.CreatedBy == UserStore().UserID" 
                            :PostContent="turnfun(e.QuestionDetailsHTML)" 
                            :Score="e.QuestionVotesCount"/>

                    </template>
                </div>
            </div>
        </template>
        
    </main>
</template>

<style scoped>
    .post {
        transition: all 0.5s ease;
        animation: mymove 1s;
    }
    @keyframes mymove {
        from {opacity: 0; transform: translateX(30px);}
        to {opacity: 100; transform: translateX(0); }
    }
</style>