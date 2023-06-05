<script setup>
import { ref,onMounted } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import BlogContainer from '../components/BlogContainer.vue';
import {useRoute} from "vue-router";
import { GetBlog } from '../Helpers/APIs/BlogAPIs';
import Alert from '../components/Alert.vue'
import CommentComponent from '../components/CommentComponent.vue'
import AnswerSection from '../components/AnswersSection.vue'

const BlogID = useRoute().params.BlogId;
const blogTitle = ref()
const AnswersId = ref ([]);
const blogcont = ref()
const score =ref();
const Cname =ref();
const Error = ref ("smth");

const AnsCount = ref ();
const CreatedBy= ref ('');
const PushAnsId = (e)=>{
    AnswersId.value.push(e);
    AnsCount.value=AnswersId.value.length;
}
let BlogData = 0;

console.log('BlogData',BlogData)
onMounted(async()=>{
    BlogData = await GetBlog(BlogID);
    if (BlogData.status !='200') {Error.value=BlogData.data; return}
    console.log (BlogData);
    Error.value="nth";
    BlogData = BlogData.data
    console.log(BlogData)
    Cname.value= BlogData.UserData.Fname +" "+BlogData.UserData.Lname;
    blogTitle.value = BlogData.BlogData.BlogTitle;
    blogcont.value = BlogData.BlogData.BlogDetailsHTML;
    blogcont.value=blogcont.value.replaceAll('<p>', "<p class='text-lg my-1'>")
    blogcont.value=blogcont.value.replaceAll('<br>', "")
    blogcont.value=blogcont.value.replaceAll('<h2>', "<h2 class='text-2xl my-2 mt-10 font-extrabold'>")
    blogcont.value=blogcont.value.replaceAll('<h3>', "<h3 class='text-xl my-2 mt-3 font-extrabold'>")
    blogcont.value=blogcont.value.replaceAll('<pre class="ql-syntax" spellcheck="false">',
         '<div class="mockup-code"> <pre data-prefix=">" class="text-warning"><code>')
    blogcont.value=blogcont.value.replaceAll('</pre>',
    '</code></pre> </div>')
    CreatedBy.value = BlogData.BlogData.CreatedBy
    score.value=parseInt(BlogData.BlogData.BlogVotesCount);
    AnswersId.value =BlogData.BlogData.AnswersList;
    console.log (BlogData.BlogData.BlogVotesCount)
    AnsCount.value= BlogData.BlogData.AnswersList? BlogData.BlogData.AnswersList.length:0;
})
</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <template v-if="Error=='smth'">
            <div class="flex">
                <button class="m-auto btn btn-square loading"></button>
            </div>
        </template>
        <template v-else>
            <Alert classProp="alert-warning"  v-if="Error!='nth'"><template #Error_Message>{{ Error }}</template></Alert>
            <template v-else>
                <BlogContainer class="mx-auto w-10/12" :BlogID="BlogID" :BlogFull="true" :CreatorName="Cname" :BlogTitle="blogTitle" :AnswerCount="AnsCount" :CreatedBy="CreatedBy" :BlogContent="blogcont" :Score="score"/>
                <CommentComponent @EmitAnsID="PushAnsId" :PostCreator="CreatedBy" :QuestionId="BlogID" Type="Blog" class="z-10"/>
                <template v-if="AnswersId.length!=0">
                    <div class="card bg-Grey2 w-9/12 rounded-none border border-t-[3rem] mt-[-4rem] border-[0.2rem]  border-black relative mx-auto my-10 h-full p-5">
                        <div class="bg-white w-full h-fit rounded-xl p-5">
                            <!-- <template v-if="AnswersId.length != 0"> -->
                                <template  v-for ="(e,i) in AnswersId" v-bind:key="i" >
                                        <AnswerSection :PostCreator="CreatedBy" :PostId="BlogID" :AnswerId="e"/>
                                </template>
                        </div>
                    </div>
                </template>
    
            </template>
        </template>
        
    </main>
</template>