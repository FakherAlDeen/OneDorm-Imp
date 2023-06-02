<script setup>
import { ref,onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import { UserStore } from '../stores/UserStore';
import router from '../router';
import { GetUser, GetUserPosts } from '../Helpers/APIs/UserAPIs';
import PostContainer from '../components/PostContainer.vue';
import { useRoute } from 'vue-router';
const UserId = useRoute().params.UserId;
const userdata = ref ();
const Loading = ref (true);
const PostsList = ref ([]);
onBeforeMount(async ()=>{
    const res = await GetUser(UserId);
    console.log (res.data);
    userdata.value = res.data;
    const posts = await GetUserPosts(UserId);
    console.log (posts.data);
    PostsList.value = posts.data;
    console.log(PostsList.value);
    Loading.value = false;
})
const turnfun= (e)=>{
    e=e.replaceAll('<p>', "<p class='text-lg my-1 font-extrabold'>");
    e=e.replaceAll('<br>', "");
    return e;
};
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
                <div class="flex gap-6">
                    <div class="w-1/4 h-1/3">
                        <div class="flex flex-col">
                            <div>
                                <div class="avatar mb-7">
                                    <div class="w-full h-auto border-2 transition-all duration-150 ease-in-out border-black shadow-main3 shadow-BoxBlackSm hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                                        <img :src='`data:${userdata.Image.contentType};base64,${userdata.Image.image}`' />
                                    </div>
            
                                </div>
                            </div>
                            <div>
                                <button 
                                class="focus:none btn btn-success bg-main3 shadow-main2 border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                                    Chat with {{ userdata.Fname + " " + userdata.Lname }}
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="grow flex flex-col gap-10 mx-10">
                        <div>
                            <h2>Posts:</h2>
                        </div>
                        <div class="">
                            <template v-for="(e) in PostsList" :key="e.QuestionId">
                                    <PostContainer @click="ClickHanlder(e.QuestionId)" class="w-full cursor-pointer transition ease-in-out hover:scale-105" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>

                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        
    </main>
</template>