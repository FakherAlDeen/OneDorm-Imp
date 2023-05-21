<script setup>
import { ref, onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
import { SearchPost } from '../Helpers/APIs/SearchAPIs';
import VueCookies from 'vue-cookies'
import {useRoute} from "vue-router";
import router from '../router';


const postcont = ref("<p>My university is kinda hard and I was wondering if anyone would actually end up with a perfect GPA at the end of it all. </p><p><br></p><p>Wanted to hear your opinion about it!</p><p>Wanted to hear your opinion about it!</p>")
postcont.value=postcont.value.replaceAll('<p>', "<p class='text-lg my-1'>")
postcont.value=postcont.value.replaceAll('<br>', "")
console.log (postcont.value)
const Hashtags = ['#2312','#2312','#2312']
const up=ref(12);
const down =ref(13);
// console.log (VueCookies.get('Token'))
const SearchVal= ref('');
const PostsList = ref ([]);
console.log(SearchVal);
onBeforeMount(async ()=>{
    SearchVal.value = useRoute().params.SearchVal;
    const res = await SearchPost(`/SearchResult/${SearchVal.value}`);

    console.log (res);
    PostsList.value = res.data;
    console.log (PostsList.value[0]);

});

const turnfun= (e)=>{
    e=e.replaceAll('<p>', "<p class='text-lg my-1 font-extrabold'>");
    e=e.replaceAll('<br>', "");
    console.log (e);
    return e;
}
const ClickHanlder = (e)=>{
    router.push ({
        name: 'Post',
        params: {
            QuestionId: e,
        }
    })
}
</script>
<template>
    <main class="relative">
        <HeaderComponent></HeaderComponent>

        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <div class="mx-32 my-10">
            <h2 class="text-4xl font-light text-center pb-2">Searching for: <span class="font-[1000] text-main3">{{ SearchVal }}</span></h2>
        </div>
        <template v-if="PostsList.length > 0">
            <div class="m-16 mt-10">
                <h2 class="text-5xl font-[1000] text-center pb-2">Perfect Match for: {{ SearchVal }}</h2>
            </div>
            <div class="">
                <template v-for="(e,i) in PostsList" :key="i">
                    <div v-if="i==0">
                        <PostContainer @click="ClickHanlder(e.QuestionId)"  class="transition ease-in-out hover:scale-105 cursor-pointer mt-10 w-11/12 hover:none" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :postFull="false" :PostContent="turnfun(e.QuestionDetailsHTML)" :Hashtags="e.Hashtags" :Score="e.QuestionVotesCount"/>
                        <div class="w-1/2 mx-auto border-b-4 border-Grey pb-3">
                            <!-- <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8">MORE FOR YOU</h2> -->
                        </div>
                    </div>
                    <PostContainer @click="ClickHanlder(e.QuestionId)" class="cursor-pointer transition ease-in-out hover:scale-105" v-else :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>
                </template>
            </div>
        </template>
        <template v-else>
            <div class="m-16 mt-10">
                <h2 class="text-5xl font-[1000] text-center pb-2">No Result Found :c</h2>
            </div>
        </template>
    </main>
</template>