<script setup>
import { UserStore } from '../stores/UserStore'
import flag04 from './icons/Post_icons/flag-04.vue';
import Arrowup from './icons/Post_icons/ArrowUp.vue'
import Arrowdown from './icons/Post_icons/ArrowDown.vue'
import Comment from './icons/Post_icons/CommentIcon.vue'
import { onMounted, ref , watch} from 'vue';
import QuillComp from './QuilllComp.vue'
import {GetAnswer} from '../Helpers/APIs/PostAPIs'
import AnswersSectionChild from './AnswersSectionChild.vue';
const props = defineProps({
    AnswerId:String
})

const v =ref ();
const name =ref ("");
const score = ref (0);
const AnswerLists=ref ([]);
function diff_minutes(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
  
 }
 const ActualDate = ref();
onMounted (async ()=>{
    const res = await GetAnswer(props.AnswerId);
    const commentData= res.data.AnswerData;
    const UserData= res.data.UserData;
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
    AnswerLists.value = commentData.AnswersList;
})
const Reply=ref(false);
const ReplyHandler = () =>{
    Reply.value = !Reply.value;
}

const EmitHanlder= (e)=>{
    AnswerLists.value.push(e);
}


</script>
<template>
    <div class="flex gap-2">
        <div class="mr-5">
            <div class="avatar">
                <div class="w-16 rounded-xl">
                    <img :src="UserStore().image" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2 justify-center my-1 w-10/12">
            <div>
                <h2 class="text-2xl font-extrabold">{{name}} <span class="text-base text-Grey font-extrabold ml-2">{{ActualDate}}</span></h2>
                <h2 class="text-base text-Grey font-extrabold">PSUT - CS student - {{AnswerLists.length}} answers</h2>
            </div>
            <div v-html="v">
                
            </div>
            <div class="flex gap-0 h-fit items-center">
                <Arrowup class="w-9 h-9"/>
                <Arrowdown class="w-9 h-9"/>
                <p class="text-xl font-bold mx-4">{{ score }}</p>
                <div class="btn-ghost btn">

                    <Comment class="w-7 h-7"/>
                </div>
                <p class="text-lg font-bold mx-2 ml-2 btn-ghost btn" @click="ReplyHandler">Reply</p>
                <p class="text-lg font-bold btn-ghost btn" >Share</p>
                <p class="text-lg font-bold text-Alert btn-ghost btn">Report</p>
            </div>
            <div v-if = "Reply" class="h-[6rem] my-4 mb-16">
                <QuillComp @emit-ans-i-d="EmitHanlder" :AnswerOfAnswerId="AnswerId"/>
            </div>
            <template v-for="(e,i) in AnswerLists" :key="i">
                <AnswersSection :AnswerId="e"></AnswersSection>
            </template>
        </div>
    </div>
</template>