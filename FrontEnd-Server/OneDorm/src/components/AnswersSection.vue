<script setup>
import { UserStore } from '../stores/UserStore'
import Arrowup from '../assets/icons/Post_icons/ArrowUp.vue'
import Arrowdown from '../assets/icons/Post_icons/ArrowDown.vue'
import Comment from '../assets/icons/Post_icons/CommentIcon.vue'
import { onMounted, ref , watch} from 'vue';
import QuillComp from './QuilllComp.vue'
import {DeletePost,GetAnswer , Vote} from '../Helpers/APIs/PostAPIs'
import router from '../router';
import { GetUser } from '../Helpers/APIs/UserAPIs';

const imageCreator = ref ('Loading');
const props = defineProps({
    AnswerId:String,
    PostId:String,
    PostCreator:String,
})
console.log ('post Id',props.PostId);
console.log ('Creator Id',props.PostCreator);
// UserStore().socket.emit('NotificationSend','boobs');
const mine =  ref (false);
const UserVotes= UserStore().UserVotes;
const MyVotes = ref (0);
MyVotes.value = UserVotes[props.AnswerId]?UserVotes[props.AnswerId]:0
const v =ref ();
const name =ref ("");
const score = ref (0);
const AnswerLists=ref ([]);
const VoteHandler = async (e)=>{
    if (MyVotes.value == e) return;
    if (MyVotes.value != e && MyVotes.value!= 0){
        score.value += e;
    }
    score.value+=e;
    MyVotes.value =e;
    UserVotes[props.PostID] = MyVotes.value
    console.log (score.value);
    const data = {
        UserId: UserStore().UserID,
        Id : props.AnswerId,
        Type: 'Answer',
        VoteValue: e,
    }
    await Vote(data)
}
function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }
 const ActualDate = ref();
 const CreatedBy=ref();
 const userdata=ref();
onMounted (async ()=>{
    const res = await GetAnswer(props.AnswerId);
    const commentData= res.data.AnswerData;
    CreatedBy.value = commentData.CreatedBy;
    const UserData= res.data.UserData;
    const User = await GetUser(commentData.CreatedBy);
    userdata.value= User.data;
    console.log (userdata.value);
    console.log (User.data);
    if (User.data.Image){
        imageCreator.value = `data:${User.data.Image.contentType};base64,${User.data.Image.image}`
    }else {
        imageCreator.value = 'https://i.ibb.co/g39WZXc/User-1.png';
    }
    v.value =  commentData.AnswerDetailsHTML;
    v.value=v.value.replaceAll('<p>', "<p class='text-lg font-bold my-1'>")
    v.value=v.value.replaceAll('<br>', "")
    name.value = UserData.Fname + " "+ UserData.Lname
    score.value = parseInt(commentData.AnswerVotesCount)
    const date = new Date((commentData.CreatedAt));
    const date2= new Date ();
    // console.log('date', date.getTime(), date2,diff_minutes(date,date2))
    const dateDiff= diff_minutes(date,date2);
    let hours = parseInt(dateDiff/60);
    const days = parseInt(hours/24);
    hours %=24;
    const min = dateDiff%60;
    const hoursMinStr= hours >0? hours + " hours " + min + " min ago": "" + min + " Min ago";
    ActualDate.value = days>0 ? days + " days " + hoursMinStr: hoursMinStr;
    console.log (hours,min, ActualDate.value)
    mine.value = (UserStore().UserID == commentData.CreatedBy);
    AnswerLists.value = commentData.AnswersList;
})
const Reply=ref(false);
const ReplyHandler = () =>{
    Reply.value = !Reply.value;
}

const EmitHanlder= (e)=>{
    AnswerLists.value.push(e);
}
const DeletePostHanlder = async ()=>{
    const res = await DeletePost({Id:props.AnswerId , Type:'Answer'});
    router.go();
    console.log(res);
}


</script>
<template>
    <div class="flex gap-2">
        <div class="mr-5">
            <div class="avatar">
                <div class="w-16 rounded-xl">
                    <div v-if="imageCreator=='Loading'" class="h-full flex justify-center align-center">
                        <button  class="m-auto btn btn-square loading"></button>
                    </div>
                    <img v-else :src='imageCreator' />
                </div>
            </div>
        </div>
        <div class="flex grow flex-col gap-2 justify-center my-1 w-10/12">
            <div>
                <div class="flex gap-10 w-full">
                    <h2 class="text-2xl font-extrabold flex items-center">{{name}} 
                        <div class=" mr-2 ml-1" v-if="userdata?.VerificationState=='active'">
                            <svg fill="#39B97E" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        </div>
                    <span class="text-base text-Grey font-extrabold ml-2">
                    {{ActualDate}}</span></h2>
                    <div class="dropdown dropdown-end mt-1" v-if="mine">
                        <button tabindex="0"  class="btn btn-ghost btn-sm">
                            <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
                        </button>
                        <ul tabindex="0" class="dropdown-content border-2 border-black menu p-1 shadow bg-base-100 rounded-none w-20">
                            <li class="text-sm font-extrabold text-center btn btn-ghost btn-sm self-center w-full">Edit</li>
                            <li class="text-xs text-Alert font-extrabold btn btn-ghost btn-sm self-center w-full" @click="DeletePostHanlder">Delete</li>
                        </ul>
                    </div>
                </div>
                <h2 class="text-base text-Grey font-extrabold">
                    {{userdata?.UserDetails.University==''?'Unkown university':userdata?.UserDetails.University}} 
                    - {{userdata?.UserDetails.Major==''?'Unkown Major':userdata?.UserDetails.Major}} 
                    student - {{userdata?.AnswersList.length}} answers</h2>
            </div>
            <div v-html="v">
                
            </div>
            <div class="flex gap-0 h-fit items-center">
                <Arrowup :class="[MyVotes == 1?'fill-main3':'']" @click = "VoteHandler(1)" class="hover:fill-main3 w-9 h-9"/>
                <Arrowdown :class="[MyVotes ==-1?'fill-Alert':'']" @click = "VoteHandler(-1)" class="hover:fill-Alert w-9 h-9"/>
                <p class="text-xl font-bold mx-4">{{ score }}</p>
                <div class="btn-ghost btn">

                    <Comment class="w-7 h-7"/>
                </div>
                <p class="text-lg font-bold mx-2 ml-2 btn-ghost btn" @click="ReplyHandler">Reply</p>
                <p class="text-lg font-bold btn-ghost btn" >Share</p>
                <p class="text-lg font-bold text-Alert btn-ghost btn">Report</p>
            </div>
            <div v-if = "Reply" class="h-[6rem] my-4 mb-16">
                <QuillComp :PostCreator="PostCreator" :PostId="PostId" :CreatedBy="CreatedBy" @emit-ans-i-d="EmitHanlder" :AnswerOfAnswerId="AnswerId"/>
            </div>
            <template v-for="(e,i) in AnswerLists" :key="i">
                <AnswersSection :PostCreator="PostCreator" :PostId="PostId" :AnswerId="e"></AnswersSection>
            </template>
        </div>
    </div>
</template>