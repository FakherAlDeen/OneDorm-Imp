<script setup>
import { ref,onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import { UserStore } from '../stores/UserStore';
import router from '../router';
import { GetUserPosts , GetUserBlogs , GetUser } from '../Helpers/APIs/UserAPIs';
import PostContainer from '../components/PostContainer.vue';
import BlogContainer from '../components/BlogContainer.vue';
import {turnfun} from '../Helpers/TurnPar'

const Loading = ref (true);
const PostsList = ref ([]);
const BlogsList = ref([]);
const selected = ref ('Posts');
const userdata = ref ();
onBeforeMount(async ()=>{
    const res = await GetUser(UserStore().UserID);
    userdata.value = res.data;
    const posts = await GetUserPosts(UserStore().UserID);
    const blogs = await GetUserBlogs(UserStore().UserID);
    PostsList.value = posts.data;
    BlogsList.value = blogs.data;
    console.log(BlogsList)
    Loading.value = false;
})
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
                    <div class="w-1/2 mx-auto pb-3 border-b-4 border-Grey flex justify-center gap-5">
                        <h2 class=" text-2xl font-[1000] text-center text-Grey tracking-wide leading-8 cursor-pointer" @click="selected='Posts'" :class="[selected=='Posts'?'border-b-4 border-Grey2':'']">
                            MY POSTS
                       </h2>
                       <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8 cursor-pointer" v-if="userdata.VerificationState=='active'"  @click="selected='Blogs'" :class="[selected=='Blogs'?'border-b-4 border-Grey2':'']">
                            MY BLOGS
                        </h2>
                    </div>
                    <template v-if="selected=='Posts'">
                        <template v-if="PostsList.length>0">
                            <template v-for="(e) in PostsList" :key="e.QuestionId">
                                <PostContainer :CreatedAt="e.CreatedAt" @click="PostClickHanlder(e.QuestionId)" class="w-full cursor-pointer transition ease-in-out hover:scale-105" :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" :postFull="false" :mine="e.CreatedBy == UserStore().UserID" :PostContent="turnfun(e.QuestionDetailsHTML)" :Score="e.QuestionVotesCount"/>
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
                                <BlogContainer :CreatedAt="e.CreatedAt" @click="BlogClickHanlder(e.BlogId)" class="w-full cursor-pointer transition ease-in-out hover:scale-105" :CreatedBy="e.CreatedBy" :BlogTitle="e.BlogTitle" :AnswerCount="e.AnswersList.length" :BlogFull="false" :BlogContent="turnfun(e.BlogDetailsHTML)" :Score="e.BlogVotesCount"/>
                            </template>
                        </template>
                        <div v-else>
                            <div class="flex justify-center my-10">
                                <p class="text-3xl font-extrabold text-main1">No Blogs written.</p>
                            </div>
                        </div>
                    </template>
                    <!-- <template v-for="(e) in PostsList" :key="e.QuestionId">
                            <PostContainer @click="ClickHanlder(e.QuestionId)" 
                            class="post w-full cursor-pointer transition ease-in-out hover:scale-105" 
                            :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" 
                            :AnswerCount="e.AnswersList.length" :Hashtags="e.Hashtags" 
                            :postFull="false" :mine="e.CreatedBy == UserStore().UserID" 
                            :PostContent="turnfun(e.QuestionDetailsHTML)" 
                            :Score="e.QuestionVotesCount"/>
                    </template> -->
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