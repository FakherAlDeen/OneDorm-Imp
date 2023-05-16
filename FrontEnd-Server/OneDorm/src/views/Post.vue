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

const postcont = ref()
const Hashtags = ref()
const up=ref();
const down =ref();
const Cname =ref();
const Error = ref ("smth");
const AnsCount = ref ();
onMounted(async()=>{
    let PostData = await GetPost(PostID);
    console.log (PostData.status);
    if (PostData.status !='200') {Error.value=PostData.data; return}
    Error.value="nth";
    PostData = PostData.data
    Cname.value= PostData.UserData.Fname +" "+PostData.UserData.Lname;
    postTitle.value = PostData.PostData.QuestionTitle;
    postcont.value = PostData.PostData.QuestionDetailsHTML;
    postcont.value=postcont.value.replaceAll('<p>', "<p class='text-lg my-1'>")
    postcont.value=postcont.value.replaceAll('<br>', "")
    // console.log (PostData.AnswersList);
    AnsCount.value= PostData.AnswersList? PostData.AnswersList.length:0;
    Hashtags.value = PostData.PostData.Hashtags;
    up.value=parseInt(PostData.PostData.QuestionUpvoteCount);
    down.value =parseInt(PostData.PostData.QuestionDownVoteCount);
    console.log (down.value);
})
</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <Alert classProp="alert-warning"  v-if="Error!='nth'"><template #Error_Message>{{ Error }}</template></Alert>
        <PostContainer v-if="Error=='nth'" :CreatorName="Cname" :postTitle="postTitle" :AnswerCount="AnsCount" :Hashtags="Hashtags" :PostContent="postcont" :DownVotes="down" :UpVotes="up"/>
        <CommentComponent class="z-10"/>
        <div class="card bg-Grey2 w-9/12 rounded-none border border-t-[3rem] mt-[-4rem] border-[0.2rem]  border-black relative mx-auto my-10 h-full p-5">
            <div class="bg-white w-full h-fit rounded-xl p-5">

                <AnswerSection><template #Content><AnswerSection><template #Content><AnswerSection></AnswerSection><AnswerSection></AnswerSection></template></AnswerSection> <AnswerSection></AnswerSection></template></AnswerSection>
            </div>
        </div>
        
    </main>
</template>