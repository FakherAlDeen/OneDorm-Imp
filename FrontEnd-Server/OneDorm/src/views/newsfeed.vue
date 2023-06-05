<script setup>
import { ref,onBeforeMount } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import PostContainer from '../components/PostContainer.vue';
import { NewsFeed } from '../Helpers/APIs/NewsFeedAPIs';
import VueCookies from 'vue-cookies'
import { UserStore } from '../stores/UserStore';
import router from '../router';
import ModalComponent from '../components/ModalComponent.vue';
import { SetUsername, EditProfile, AddHashtags } from '../Helpers/APIs/UserAPIs';
import Alert from '../components/Alert.vue';
import {turnfun} from '../Helpers/TurnPar'

const University = ref ();
const Major = ref ();
const Year = ref ();
const Loading = ref (true);
const PostsList = ref ([]);
const Username = ref (UserStore().Username);
const error = ref ('');
const SelectedHash = ref ({
    '#PSUT':false,
    '#JU':false,
    '#HTU':false,
    '#HU' :false,
    '#AUM' :false,
    '#DataStructure':false,
    '#Algo':false,
    '#Discrete_1':false,
    '#Discrete_2':false,
    '#Algebra':false,
    '#Scoial':false,
    '#Friends':false,
    '#BlueFig':false,
    '#Gaming':false,
    '#Math':false,
    '#Chess':false
});
const SetUsernameHandler = async () =>{
    error.value = "";
    const data = {
        UserId: UserStore().UserID,
        Username:Username.value
    }
    const res = await SetUsername(data);
    if (res.status == 201){
        ModalPage.value++;
        return;
    }else{
        error.value = res.data;
    }
    // ModalPage.value++;
}
const HashtagClickHanlder = (e)=>{
    SelectedHash.value[e] = !SelectedHash.value[e];
}
const ShowContinueSetUpModal= ref (!Username.value? false : true);
const ModalPage = ref (1);
onBeforeMount(async ()=>{
    Loading.value = false;
    const res = await NewsFeed(UserStore().UserID);
    PostsList.value = res.data;
})
const ClickHanlder = (e)=>{
router.push ({
    name: 'Post',
    params: {
        QuestionId: e,
    }
})}
const arr = ref([]);
const EditUser = async () =>{
    const data = {
        UserId: UserStore().UserID,
        Data:{
            UserDetails:{
                University:University.value,
                Major:Major.value,
                Year:Year.value
            }
        }
    }
    await EditProfile(data);
    ModalPage.value++;
}
const NextHandler = async() =>{
    error.value = "";
    for(const s in SelectedHash.value){
        if (SelectedHash.value[s])arr.value.push(s);

    }
    if (arr.value.length<3){
        error.value = "At Least Three!";
        return;
    }
    // UserStore().CategoriesList = []
    for(const s in arr.value){
        UserStore().CategoriesList.push(arr.value[s]);
    }
    const data = {
        UserId:UserStore().UserID,
        Hashtags:arr.value
    }
    await AddHashtags(data);
    
    ModalPage.value++;
}

</script>

<template>
    <main class="relative overflow-x-hidden">
        <ModalComponent class="" :withoutCancel="true" :class="[!ShowContinueSetUpModal && ModalPage <6? 'modal-open' : '']">
            <template #content>
                <div  class="flex flex-col gap-1 my-3 overflow-x-hidden">
                    <Transition name="list" mode="out-in">
                        <div v-if="ModalPage==1" class="p-3 flex-col flex gap-10 ">
                            <h1 class="text-4xl font-base font-[1000] text-main3">Hello 
                                <span class=" text-black">
                                    {{ UserStore().Fname + " " + UserStore().Lname }} 
                                    !
                                </span> 
                            </h1>
                            <h2 class="text-xl">It appears u didn't finsih your account yet!</h2>
                            <button class="btn btn-success bg-main3 self-end w-fit text-base text-white" @click="ModalPage++">let's go</button>
                        </div>
                        <div v-else-if="ModalPage==2" class="p-3 flex-col flex gap-5 ">
                            <h2 class="text-3xl">
                                First let's start with setting your 
                                <span class="font-bold text-main3">
                                    Username:
                                </span>
                            </h2>
                            <h2 class="text-Alert">Hint: Use something flashy!</h2>
                            <input v-model="Username" type="text" placeholder="Username" class="input input-bordered w-full" />
                            <Alert classProp="alert-error"  v-if="error!=''"><template #Error_Message>{{ error }}</template></Alert>
                            <button class="btn btn-success bg-main3 self-end w-fit text-base text-white" @click="SetUsernameHandler">Set!</button>
                        </div>
                        <div v-else-if="ModalPage==3" class="p-3 flex-col flex gap-5 ">
                            <h2 class="text-3xl">
                                Express your interests using 
                                <span class="font-bold text-main3">
                                    #Hashtags!
                                </span>
                            </h2>
                            <div class="bg-Grey2 rounded-xl p-4">
                                <template v-for="(e,i) in SelectedHash" :key="i">
                                    <button class="btn m-1 btn-sm" @click = "SelectedHash[i]=true">{{ i }}</button>
                                </template>
                            </div>
                            <h2 class="text-lg font-extrabold">Selected So far</h2>
                            <div class="bg-Grey2 rounded-xl p-4">
                                <template v-for="(e,i) in SelectedHash" :key="i">
                                    <button v-if="e" class="bg-main1 border-main1 btn m-1 btn-sm" @click = "HashtagClickHanlder(i)">{{ i }}</button>
                                </template>
                            </div>
                            <Alert classProp="alert-error"  v-if="error!=''"><template #Error_Message>{{ error }}</template></Alert>
                            <button class="btn btn-success bg-main3 self-end w-fit text-base text-white" @click="NextHandler">Next!</button>
                        </div>
                        <div v-else-if="ModalPage==4" class="p-3 flex-col flex gap-5 ">
                            <h2 class="text-3xl">
                                Fill up some info 
                                <span class="font-bold text-main3">
                                    About You!
                                </span>
                            </h2>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-lg font-bold">Your University:</span>
                                </label>
                                <input v-model="University" type="text" placeholder="Princess Sumayah University for Technology" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-lg font-bold">Major:</span>
                                </label>
                                <input v-model="Major" type="text" placeholder="Computer Science" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text text-lg font-bold">What year (of university) are you in?:</span>
                                </label>
                                <input v-model="Year" type="text" placeholder="4th Year" class="input input-bordered w-full" />
                            </div>
                            <Alert classProp="alert-error"  v-if="error!=''"><template #Error_Message>{{ error }}</template></Alert>
                            <div class="flex justify-end gap-3">
                                <button class="btn btn-warning bg-main1 border-main1 self-end w-fit text-base text-white" @click="ModalPage++">Skip for later</button>
                                <button class="btn btn-success bg-main3 self-end w-fit text-base text-white" @click="EditUser">Done!</button>
                            </div>
                        </div>
                        <div v-else-if="ModalPage==5" class="p-3 flex-col flex gap-5 ">
                            <h2 class="text-3xl">
                                Thank You
                                <span class="font-bold text-main3">
                                    All Done
                                </span>
                            </h2>
                            <div class="face w-40 Pattern p-8 rounded-full h-40 my-4 self-center btn">
                                <svg fill="#FECA38" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1H393.6c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432s-140.2-50-159.2-117.9zM144.4 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm156.4 25.6c-5.3 7.1-15.3 8.5-22.4 3.2s-8.5-15.3-3.2-22.4c30.4-40.5 91.2-40.5 121.6 0c5.3 7.1 3.9 17.1-3.2 22.4s-17.1 3.9-22.4-3.2c-17.6-23.5-52.8-23.5-70.4 0z"/></svg>
                            </div>
                            <div class="flex justify-end gap-3">
                                <button class="btn btn-success bg-main3 self-end w-fit text-base text-white" @click="ModalPage++">Start navigating!</button>
                            </div>
                        </div>
                    </Transition>
                    </div>
            </template>
        </ModalComponent>
        <HeaderComponent></HeaderComponent>
        <template v-if="Loading">
            <div class="flex">
                <button class="m-auto btn btn-square loading"></button>
            </div>
        </template>
        <template v-else>
            <h2 class="text-5xl font-[1000] text-center pb-2">POST OF THE DAY</h2>
            <div class="m-5">
            </div>
                <template v-for="(e,i) in PostsList" :key="e.QuestionId">
                    <div class="">
                        <div v-if="i==0">
                            <PostContainer 
                            @click="ClickHanlder(e.QuestionId)"  
                            class="post_first mx-auto w-9/12 transition ease-in-out hover:scale-110 cursor-pointer mt-10 scale-105 hover:none" 
                            :CreatedBy="e.CreatedBy" :postTitle="e.QuestionTitle" 
                            :AnswerCount="e.AnswersList.length" :postFull="false" 
                            :mine="e.CreatedBy == UserStore().UserID" 
                            :PostContent="turnfun(e.QuestionDetailsHTML)" 
                            :Hashtags="e.Hashtags" 
                            :Score="e.QuestionVotesCount"/>
                            <div class="w-1/2 mx-auto border-b-4 border-Grey pb-3">
                                <h2 class="text-2xl font-[1000] text-center text-Grey tracking-wide leading-8">MORE FOR YOU</h2>
                            </div>
                        </div>
                        <PostContainer v-else 
                        @click="ClickHanlder(e.QuestionId)" 
                        class="post mx-auto w-9/12 cursor-pointer transition ease-in-out hover:scale-105"  
                        :CreatedBy="e.CreatedBy" 
                        :postTitle="e.QuestionTitle" 
                        :AnswerCount="e.AnswersList.length" 
                        :Hashtags="e.Hashtags" 
                        :postFull="false" 
                        :mine="e.CreatedBy == UserStore().UserID" 
                        :PostContent="turnfun(e.QuestionDetailsHTML)" 
                        :Score="e.QuestionVotesCount"/>
    
                    </div>
                </template>
        </template>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
    </main>
</template>

<style scoped>
    .list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
    transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
    }
    .post {
        transition: all 0.5s ease;
        animation: mymove 1s;
    }
    .post_first {
        transition: all 0.5s ease;
        animation: mymove2 1s;
    }
    @keyframes mymove {
        from {opacity: 0; transform: translateX(30px);}
        to {opacity: 100; transform: translateX(0); }
    }
    @keyframes mymove2 {
        from {opacity: 0; transform: translateX(30px);}
        to {opacity: 100; transform: translateX(0); transform: scale(1.05); }
    }

    .face {
        animation: myAnim 2s ease 0s 1 normal forwards;
    }
    @keyframes myAnim {
	0%,
	100% {
		transform: translateX(0%);
		transform-origin: 50% 50%;
	}

	15% {
		transform: translateX(-30px) rotate(-6deg);
	}

	30% {
		transform: translateX(15px) rotate(6deg);
	}

	45% {
		transform: translateX(-15px) rotate(-3.6deg);
	}

	60% {
		transform: translateX(9px) rotate(2.4deg);
	}

	75% {
		transform: translateX(-6px) rotate(-1.2deg);
	}
}
</style>