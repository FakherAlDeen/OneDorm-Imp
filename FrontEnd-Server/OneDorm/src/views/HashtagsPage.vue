<script setup>
import { ref, onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
import { GetHashtagPosts } from '../Helpers/APIs/PostAPIs';
import { AddHashtags,RemoveHashtag } from '../Helpers/APIs/UserAPIs';

import {useRoute} from "vue-router";
import router from '../router';
import { UserStore } from '../stores/UserStore';
const Hashtag= ref('');
const PostsList = ref ([]);
const Loading = ref(true);
const isSubscribed = ref();
onBeforeMount(async ()=>{
    Hashtag.value = useRoute().params.HashVal;
    console.log(Hashtag.value);
    const res = await GetHashtagPosts(Hashtag.value)
    console.log (res);
    Loading.value = false;
    PostsList.value = res.data;
    isSubscribed.value= UserStore().CategoriesList.find(e=>e=='#'+Hashtag.value)
    console.log (PostsList.value[0]);


});
const turnfun= (e)=>{
    e=e.replaceAll('<p>', "<p class='text-lg my-1 font-extrabold'>");
    e=e.replaceAll('<br>', "");
    // console.log (e);
    return e;
};
const ClickHanlder = (e)=>{
    router.push ({
        name: 'Post',
        params: {
            QuestionId: e,
        }
    })
};
const SubscribeHandler = async()=>{
    if (isSubscribed.value){
        const res = await  RemoveHashtag({
        UserId:UserStore().UserID,
        Hashtag:'#'+Hashtag.value
        })
        console.log (res);
        if (res.status==201){
        isSubscribed.value=false;
        const indx = UserStore().CategoriesList.indexOf('#'+Hashtag.value);
        delete UserStore().CategoriesList[indx];
        console.log (indx)
        console.log (UserStore().CategoriesList)
        }
        return;
    }
    const res = await AddHashtags({
        UserId:UserStore().UserID,
        Hashtags:['#'+Hashtag.value]
    })
    console.log (res);
    if (res.status==201){
        isSubscribed.value=true;
        UserStore().CategoriesList.push('#'+Hashtag.value)
    }
}
</script>
<template>
    <main class="relative overflow-x-hidden">
        <HeaderComponent></HeaderComponent>
        <template v-if="Loading">
            <div class="flex">
                <button class="m-auto btn btn-square loading"></button>
            </div>
        </template>
        <template v-else>

            <div class="mx-32 my-10 flex justify-between items-center">
                <div>
                    <h2 class="text-4xl font-light text-left pb-2">Posts for hashtag: <span class="font-[1000] text-main3">{{ '#'+Hashtag }}</span></h2>
                    <h2 class="text-2xl font-light text-left pb-2">Posts count: <span class="font-[1000] text-main3">{{ PostsList.length }}</span></h2>
                </div>
                <button 
                @click="SubscribeHandler" 
                :class="[isSubscribed?'bg-Alert shadow-Alert':'shadow-main2']"
                class="mt-2 focus:none btn btn-warning shadow-main1 border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                    {{isSubscribed?'Unsubscribe':'Subscribe to #'+Hashtag}}
                </button>
            </div>
            <template v-if="PostsList.length > 0">
                <TransitionGroup name="list" tag="PostContainer">
                    <template v-for="(e) in PostsList" :key="e.QuestionId">
                            <PostContainer @click="ClickHanlder(e.QuestionId)" class="mx-auto w-9/12 cursor-pointer transition ease-in-out hover:scale-105" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>
                    </template>
                </TransitionGroup>
            </template>
            <template v-else>
                <div class="m-16 mt-10">
                    <h2 class="text-5xl font-[1000] text-center pb-2">No Posts in this hashtag :c</h2>
                </div>
            </template>
        </template>
    </main>
</template>

<style scoped>
    .list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
    transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
    }
</style>