<script setup>
import { ref, onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
import { SearchPost } from '../Helpers/APIs/SearchAPIs';
import {useRoute} from "vue-router";
import router from '../router';
import { UserStore } from '../stores/UserStore';
import {turnfun} from '../Helpers/TurnPar'
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
                    <template v-for="(e,i) in PostsList" :key="i">
                        <div class="">
                            <div v-if="i==0">
                                <PostContainer @click="ClickHanlder(e.QuestionId)"  class="post_first mx-auto w-9/12 transition ease-in-out hover:scale-110 cursor-pointer scale-105 mt-10 hover:none" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Hashtags="e.Hashtags" :Score="e.QuestionVotesCount"/>
                                <div class="w-1/2 mx-auto border-b-4 border-Grey pb-3">
                                    <!-- <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8">MORE FOR YOU</h2> -->
                                </div>
                            </div>
                            <PostContainer @click="ClickHanlder(e.QuestionId)" class="post mx-auto w-9/12 cursor-pointer transition ease-in-out hover:scale-105" v-else :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>
                        </div>
                    </template>
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
    .post {
        transition: all 0.5s ease;
        animation: mymove 1s;
    }
    .post_first {
        transition: all 0.5s ease;
        animation: mymove2 1s;
    }
    @keyframes mymove {
        from {opacity: 0; transform: translateX(30px);}
        to {opacity: 100; transform: translateX(0); }
    }
    @keyframes mymove2 {
        from {opacity: 0; transform: translateX(30px);}
        to {opacity: 100; transform: translateX(0); transform: scale(1.05); }
    }
</style>