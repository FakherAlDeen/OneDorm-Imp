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
onMounted (async ()=>{
    const res = await GetAnswer(props.AnswerId);
    const commentData= res.data.AnswerData;
    const UserData= res.data.UserData;
    const User = await GetUser(commentData.CreatedBy);
    console.log (User.data);
    if (User.data.Image){
        imageCreator.value = `data:${User.data.Image.contentType};base64,${User.data.Image.image}`
    }else {
        imageCreator.value = 'https://lh3.googleusercontent.com/Dq9gy_sLK2FmQ-vmMOQQGPfAMv5sSeyrwb1UcvR2urDFrPVTkbfCWtovJZjuI-yumftkgH_vgBXPIx06cmVIVNFlnbLLoy6cmip4B8X6t7Zf_RgNdtZXAD-VLguppLve70PDLHob3qHHf_kWme51kJ0-OiLO2Z7r74BHRXy87YNvHRXUCPMdcRXFbcJEQ__W74BYmqWn7sjHDS8MYt8k_LrZigHUc67yTsLXDAWndnkPb8kEwYc0586uW3_780brtk1hxkDD0pOhvAc1duE2qeuNvl7rIpub02yc0qcoa1PjN80Xo5bS3ryIrOuaT6GGsCUA7jneiC0xuaSqVnc63SHANR9feT_bZ2p6oMfhjIlVWGqqyxidq6p0Yph360b41Nl5wuMT2snmNrFDZdVYMFNstqfbnAbroT7Fk9xXY_Lp_H7qyL6YlhQo71WGfmInOtciH8ueg3pJJ06VjYySpnNjImH4zyL3X0E9VOVZ6R7yzs8OCLB99Kdqac1cr5Noa8cT1NzEawandu2BL9f0qXnGaZdhI5M_1PRGLasXrRFOEmet9lncKfDG5aZ3Eqo27eyViYetsT8jhs1yOyAI8X8yBgNg7xd-olVsaOk0573RzzvOYTXBAzNU65PdMWuhgfgAeu4wJ8eqT-QFUkREviSpr-3kn0LZEGKou6hJEUVuLLf3CVC3Vg-ZigOcWfNCNBpojMvAk19Ct5EgUe2MUDy0YSDCqbxXTadLp8drYqw_gYCi1Leoo-fibfk80zYcqDU8I_OwG6a8P0OBjBjfgaNaux-b2wUX3npiwXz4FRTKjQzt7wZSaIpgdlpyB3lDPS0kWurvQu4oX6KefKYvEAw-QM5D2VJ37Lq3RrcgtpgOuqCRIGIuI__Hm9SnG3HC8ysZRErpYZfhN3P6r1LjMYXixxHbLy-tUofB4wzx6m_2XhfmZTwe_6nkMml_qjp5aIN1t0xCteR5BDRK3xZkl_wVSfEsDc1tBs0svefPEdGaKDKLUtVCYyTOGEqC9UshrS-3LA2stGb38P7_GxRuSDhTwa0=w1080-h1080-s-no?authuser=0';
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
                    <h2 class="text-2xl font-extrabold">{{name}} <span class="text-base text-Grey font-extrabold ml-2">{{ActualDate}}</span></h2>
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
                <h2 class="text-base text-Grey font-extrabold">PSUT - CS student - {{AnswerLists.length}} answers</h2>
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
                <QuillComp @emit-ans-i-d="EmitHanlder" :AnswerOfAnswerId="AnswerId"/>
            </div>
            <template v-for="(e,i) in AnswerLists" :key="i">
                <AnswersSection :PostCreator="PostCreator" :PostId="PostId" :AnswerId="e"></AnswersSection>
            </template>
        </div>
    </div>
</template>