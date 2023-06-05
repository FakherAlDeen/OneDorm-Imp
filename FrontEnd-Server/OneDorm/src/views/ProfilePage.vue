<script setup>
import { ref,onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import { UserStore } from '../stores/UserStore';
import router from '../router';
import { GetUser, GetUserBlogs, GetUserPosts } from '../Helpers/APIs/UserAPIs';
import PostContainer from '../components/PostContainer.vue';
import { formatDate } from '@vueuse/core'
import { useRoute } from 'vue-router';
import BlogContainer from '../components/BlogContainer.vue';
const UserId = useRoute().params.UserId;
const userdata = ref ();
const Loading = ref (true);
const PostsList = ref ([]);
const BlogsList = ref ([]);
onBeforeMount(async ()=>{
    const res = await GetUser(UserId);
    console.log (res.data);
    userdata.value = res.data;
    const posts = await GetUserPosts(UserId);
    const blogs = await GetUserBlogs(UserId);
    console.log (posts.data);
    PostsList.value = posts.data;
    BlogsList.value = blogs.data;
    console.log(PostsList.value);
    Loading.value = false;
})
const turnfun= (e)=>{
    e=e.replaceAll('<p>', "<p class='text-lg my-1 font-extrabold'>");
    e=e.replaceAll('<br>', "");
    return e;
};
const PostClickHanlder = (e)=>{
    router.push ({
        name: 'Post',
        params: {
            QuestionId: e,
        }
    })
}
const BlogClickHanlder = (e)=>{
    router.push ({
        name: 'Blog',
        params: {
            BlogId: e,
        }
    })
}
const selected=ref ('Posts');
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
                    <div class="w-3/4 grow flex flex-col gap-10 mx-10">
                        <div 
                        class=" grow p-5 bg-postBG shadow-BoxBlackSm shadow-Grey border-2 border-black hover:translate-x-[0.45rem] transition-all duration-150 ease-in-out hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                                <div class="mx-2">
                                    <div class="flex justify-between">
                                        <h2 class="text-3xl font-extrabold text-main1">{{userdata.Fname + " " + userdata.Lname}}</h2>
                                        <h2 class="text-lg font-extralight text-Grey">
                                            Academic status: 
                                            <span class="font-extrabold" :class="[userdata.VerificationState == 'pending'?'text-main2':'text-main3']">
                                            {{userdata.VerificationState == 'inactive'?'Student':userdata.VerificationState}}
                                            </span>
                                        </h2>
                                    </div>
                                    <h2 class="text-lg font-extralight text-Grey">username: 
                                        <span class="font-extrabold">
                                        {{userdata.Username}}
                                        </span>
                                    </h2>
                                    <h2 class=" text-xl font-light text-Grey flex gap-2 items-center">
                                        <svg class= "mb-1" fill="#7E7E7E" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M448 384c-28.02 0-31.26-32-74.5-32-43.43 0-46.825 32-74.75 32-27.695 0-31.454-32-74.75-32-42.842 0-47.218 32-74.5 32-28.148 0-31.202-32-74.75-32-43.547 0-46.653 32-74.75 32v-80c0-26.5 21.5-48 48-48h16V112h64v144h64V112h64v144h64V112h64v144h16c26.5 0 48 21.5 48 48v80zm0 128H0v-96c43.356 0 46.767-32 74.75-32 27.951 0 31.253 32 74.75 32 42.843 0 47.217-32 74.5-32 28.148 0 31.201 32 74.75 32 43.357 0 46.767-32 74.75-32 27.488 0 31.252 32 74.5 32v96zM96 96c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40zm128 0c-17.75 0-32-14.25-32-32 0-31 32-23 32-64 12 0 32 29.5 32 56s-14.25 40-32 40z"/></svg>
                                        {{userdata.DateOfBirth?formatDate(new Date(userdata.DateOfBirth), 'YYYY-MM-DD'):"we don't know :c"}}
                                    </h2>
                                    <div class="flex gap-10">
                                        <h2 class="mt-4 text-xl font-light text-Grey">University: 
                                                <span class="font-extrabold text-main1">
                                                {{userdata.UserDetails.University?userdata.UserDetails.University:"we don't know :c"}}
                                                </span>
                                        </h2>
                                        <h2 class="mt-4 text-xl font-light text-Grey">Major: 
                                                <span class="font-extrabold text-main1">
                                                {{userdata.UserDetails.Major?userdata.UserDetails.Major:"we don't know :c"}}
                                                </span>
                                        </h2>
                                    </div>
                                    <div class="flex gap-10 mt-2">
                                        <h2 class="text-xl font-light text-Grey">Country: 
                                                <span class="font-extrabold text-main1">
                                                {{userdata.UserDetails.Country?userdata.UserDetails.Country:"we don't know :c"}}
                                                </span>
                                        </h2>
                                        <h2 class="text-xl font-light text-Grey">City: 
                                                <span class="font-extrabold text-main1">
                                                {{userdata.UserDetails.City?userdata.UserDetails.City:"we don't know :c"}}
                                                </span>
                                        </h2>
                                    </div>
                                    <div class="flex justify-between mt-4">
                                        <h2 class="mt-4 text-2xl font-light text-Grey">Posts created: 
                                            <span class="font-extrabold text-main3">
                                            {{PostsList.length}}
                                            </span>
                                        </h2>
                                        <h2 v-if="userdata.VerificationState=='active'" class="mt-4 text-2xl font-light text-Grey">Blogs created: 
                                            <span class="font-extrabold text-main3">
                                            {{userdata?.BlogList?.length?userdata?.BlogList?.length:0}}
                                            </span>
                                        </h2>
                                        <h2 class="mt-4 text-2xl font-light text-Grey">Answers created: 
                                            <span class="font-extrabold text-main3">
                                            {{userdata.AnswersList.length}}
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                        </div>
                        <div class="">
                            <div class="w-1/2 mx-auto pb-3 border-b-4 border-Grey flex justify-center gap-5">
                                <h2 class=" text-2xl font-[1000] text-center text-Grey tracking-wide leading-8 cursor-pointer" @click="selected='Posts'" :class="[selected=='Posts'?'border-b-4 border-Grey2':'']">
                                    THEIR POSTS
                                </h2>
                                <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8 cursor-pointer" v-if="userdata.VerificationState=='active'"  @click="selected='Blogs'" :class="[selected=='Blogs'?'border-b-4 border-Grey2':'']">
                                    THEIR BLOGS
                                </h2>
                            </div>
                            <template v-if="selected=='Posts'">
                                <template v-if="PostsList.length>0">
                                    <template v-for="(e) in PostsList" :key="e.QuestionId">
                                        <PostContainer @click="PostClickHanlder(e.QuestionId)" class="w-full cursor-pointer transition ease-in-out hover:scale-105" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>
                                    </template>
                                </template>
                                <div v-else>
                                    <div class="flex justify-center my-10">
                                        <p class="text-3xl font-extrabold text-main1">No Posts written.</p>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <template v-if="BlogsList.length>0">
                                    <template v-for="(e) in BlogsList" :key="e.BlogId">
                                        <BlogContainer @click="BlogClickHanlder(e.BlogId)" class="w-full cursor-pointer transition ease-in-out hover:scale-105" :CreatedBy="e.CreatedBy" :BlogTitle="e.BlogTitle" :AnswerCount="e.AnswersList.length" :BlogFull="false" :BlogContent="turnfun(e.BlogDetailsHTML)" :Score="e.BlogVotesCount"/>
                                    </template>
                                </template>
                                <div v-else>
                                    <div class="flex justify-center my-10">
                                        <p class="text-3xl font-extrabold text-main1">No Blogs written.</p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        
    </main>
</template>