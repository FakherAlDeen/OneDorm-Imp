<script setup>
import { ref, onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
import { SearchPost } from '../Helpers/APIs/SearchAPIs';
import {useRoute} from "vue-router";
import router from '../router';
import { UserStore } from '../stores/UserStore';

const SearchVal= ref('');
const PostsList = ref ([]);
const Loading = ref(true);
console.log(SearchVal);
onBeforeMount(async ()=>{
    SearchVal.value = useRoute().params.SearchVal;
    const res = await SearchPost(`/SearchResult/${SearchVal.value}`);
    Loading.value = false;
    console.log (res);
    PostsList.value = res.data;
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

            <div class="mx-32 my-10">
                <h2 class="text-4xl font-light text-center pb-2">Searching for: <span class="font-[1000] text-main3">{{ SearchVal }}</span></h2>
            </div>
            <template v-if="PostsList.length > 0">
                <div class="m-16 mt-10">
                    <h2 class="text-5xl font-[1000] text-center pb-2">Perfect Match for: {{ SearchVal }}</h2>
                </div>
                <TransitionGroup name="list" tag="PostContainer">
                    <template v-for="(e,i) in PostsList" :key="i">
                        <div class="">
                            <div v-if="i==0">
                                <PostContainer @click="ClickHanlder(e.QuestionId)"  class="mx-auto w-9/12 transition ease-in-out hover:scale-110 cursor-pointer mt-10 scale-105 hover:none" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Hashtags="e.Hashtags" :Score="e.QuestionVotesCount"/>
                                <div class="w-1/2 mx-auto border-b-4 border-Grey pb-3">
                                    <!-- <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8">MORE FOR YOU</h2> -->
                                </div>
                            </div>
                            <PostContainer @click="ClickHanlder(e.QuestionId)" class="mx-auto w-9/12 cursor-pointer transition ease-in-out hover:scale-105" v-else :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>
                        </div>
                    </template>
                </TransitionGroup>
            </template>
            <template v-else>
                <div class="m-16 mt-10">
                    <h2 class="text-5xl font-[1000] text-center pb-2">No Result Found :c</h2>
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