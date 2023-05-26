<script setup>
import { ref,onMounted } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
import {useRoute} from "vue-router";
import { GetPost } from '../Helpers/APIs/PostAPIs';
import Alert from '../components/Alert.vue'
import CommentComponent from '../components/CommentComponent.vue'
import AnswerSection from '../components/AnswersSection.vue'

const PostID = useRoute().params.QuestionId;
const postTitle = ref()
const AnswersId = ref ([]);
const postcont = ref()
const Hashtags = ref()
const score =ref();
const Cname =ref();
const Error = ref ("smth");

const AnsCount = ref ();
const CreatedBy= ref ();
const PushAnsId = (e)=>{
    AnswersId.value.push(e);
    AnsCount.value=AnswersId.value.length;
}
let PostData = 0;

console.log('postdata',PostData)
onMounted(async()=>{
    PostData = await GetPost(PostID);
    if (PostData.status !='200') {Error.value=PostData.data; return}
    console.log (PostData);
    Error.value="nth";
    PostData = PostData.data
    
    Cname.value= PostData.UserData.Fname +" "+PostData.UserData.Lname;
    postTitle.value = PostData.PostData.QuestionTitle;
    postcont.value = PostData.PostData.QuestionDetailsHTML;
    postcont.value=postcont.value.replaceAll('<p>', "<p class='text-lg my-1'>")
    postcont.value=postcont.value.replaceAll('<br>', "")
    Hashtags.value = PostData.PostData.Hashtags;
    CreatedBy.value = PostData.PostData.CreatedBy
    score.value=parseInt(PostData.PostData.QuestionVotesCount);
    AnswersId.value =PostData.PostData.AnswersList;
    console.log (PostData.PostData.QuestionVotesCount)
    AnsCount.value= PostData.PostData.AnswersList? PostData.PostData.AnswersList.length:0;
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
                <PostContainer :PostID="PostID" :postFull="true" :CreatorName="Cname" :postTitle="postTitle" :AnswerCount="AnsCount" :CreatedBy="CreatedBy" :Hashtags="Hashtags" :PostContent="postcont" :Score="score"/>
                <CommentComponent @EmitAnsID="PushAnsId" :QuestionId="PostID" class="z-10"/>
                <template v-if="AnswersId.length!=0">
                    <div class="card bg-Grey2 w-9/12 rounded-none border border-t-[3rem] mt-[-4rem] border-[0.2rem]  border-black relative mx-auto my-10 h-full p-5">
                        <div class="bg-white w-full h-fit rounded-xl p-5">
                            <!-- <template v-if="AnswersId.length != 0"> -->
                                <template  v-for ="(e,i) in AnswersId" v-bind:key="i" >
                                        <AnswerSection :AnswerId="e"/>
                                </template>
                        </div>
                    </div>
                </template>
    
            </template>
        </template>
        
    </main>
</template>