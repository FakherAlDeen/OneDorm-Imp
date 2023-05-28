<script setup>
import { UserStore } from '../stores/UserStore'
import flag04 from '../assets/icons/Post_icons/flag-04.vue';
import Arrowup from '../assets/icons/Post_icons/ArrowUp.vue'
import Arrowdown from '../assets/icons/Post_icons/ArrowDown.vue'
import { GetUser } from '../Helpers/APIs/UserAPIs';
import {DeletePost, Vote} from '../Helpers/APIs/PostAPIs'
import { ref ,onBeforeMount} from 'vue'
import ModalComponent from './ModalComponent.vue';
import router from '../router';

    const props = defineProps({
        PostID:String,
        postTitle:String,
        Hashtags:Array,
        PostContent:String,
        Score: Number,
        postFull:Boolean,
        AnswerCount:Number,
        CreatorName:String,
        CreatedBy:String,
    })
    const mine = ref (props.CreatedBy==UserStore().UserID)

    const Creator = ref (props.CreatorName);
    const UserVotes= UserStore().UserVotes;
    const ModalDeleteShow = ref (false);
    const imageCreator = ref ('Loading');
    const sScore = ref (props.Score)


    const MyVotes = ref (0);
    if (UserVotes){
        MyVotes.value = UserVotes[props.PostID]?UserVotes[props.PostID]:0
    }
    const VoteHandler = async (e)=>{
        if (MyVotes.value == e) return;
        if (MyVotes.value != e  && MyVotes.value!= 0){
            sScore.value += e;
        }
        sScore.value+=e;
        MyVotes.value =e;
        UserVotes[props.PostID] = MyVotes.value
        const data = {
            UserId: UserStore().UserID,
            Id : props.PostID,
            Type: 'Question',
            VoteValue: e,
        }
        await Vote(data)
    }
    onBeforeMount(async () =>{
        const res = await GetUser(props.CreatedBy);
        Creator.value = res.data.Fname?res.data.Fname + " " + res.data.Lname:'UNKOWN';
        if (res.data.Image){
            imageCreator.value = `data:${res.data.Image.contentType};base64,${res.data.Image.image}`
        }else {
            imageCreator.value = 'https://lh3.googleusercontent.com/DOtCpyyzJbEhqw1KV93aAvKFevJCmn-6oSQ-55XdSL3kZak9qubt0reC1r7wnd0zMS82oSTd8E01k918qxPkrji2ouMDWraIbRMGSx9RvbIraXtWh1kHVhvJyM9HdYY7bHpZpqADSd9BDO4KOwbgXhjHYeRw-ThmfzpZSAoQep7xTJz-iGIWlW0GZeyPFTAb3VFuaNmuQZBitZRvt-kql1vJpFfZvbk_T2lkGWw44ghGKWRmIQ__omWtqgyTSdDD59bsQIQHRZTn-E-Pv030Gs6Y-XD6py0UDTi4sr5i2Sj1R2dCbb29AH3nBv-3k0V6iNT45MszvWorm5mYZZMJo7wx4lmMrf06LQfQikcQGza0HvLEXOMPiK3rrft9dxyOhHCWbcJzBqKmBzMGS3057RKRfBbmc_S4Z5x6Bfs8Pygjg4i3lxhzcaKsf4uHFF-HcOGw2J-KRUW1oyadNuaycQLDq3njfgo8_GjwzKUIj4OAZfrM5u2cPbd7Kw6GbikC5zjzSX-hCnGyz4cnZ-6QtNHpt32tTMoTYhlwJ1Ue-VJp9pHt4rueVVYDhdBQMqnEMqbGFBPZY5nmwlM2icTDaEMZCb0UGBtJAO1TZZgFcE0NVxWiuX358PjmzE_e-z1NRg_uMC8k5pVYSCqBfY8illX6kekQv8OTsMEvN7diJxr8xjrWUrNL8otnyAs0h0py3r9A7B9zD8UiL_RNSAIxDYdR1LJR6WAQNhiLbGrqsjrhkfu3me-PHxMtTPUapMDUF1wJIduSDiGZngj33HeLKLYvVjFPhzagETncLxqI3KsGkIhf54YovHiWcbiyQDUAEpQtF8U6oDfKzrnDFHRYboVDayI-NcYf4HTFgY1jKDXT23DlZ3x-uSvHrn0sEodVMFgBZ7-KTvvyn6hcS_DQMXiWbXKYtb8GLlOzOFSAauuPiLCrE8pMC2yH1mpwV9fRR4f81slt_10b3UvIV6f3P0fq1UDoe5Bo9brTt35IlrKTNGnhqy_IxkqkyYZL0JfZ5vK8i0ceErqWKf90eFcuT3Y9AJw=w961-h961-s-no?authuser=0';
        }
    })
    const DeletePostHanlder = async ()=>{
        await DeletePost({Id:props.PostID , Type:'Question'});
        router.push('/NewsFeed');
        ModalDeleteShow.value=false
    }
</script>


<template>
    <div>
        <ModalComponent @emit-close="ModalDeleteShow=false" :class="[ModalDeleteShow? 'modal-open' : '']" @Func1="DeletePostHanlder" ModalContent="Are you sure you wanna delete your post ?" ModalContentHeader="Are you sure!" Btn1Cont="Delete!" :with-btn1="true"></ModalComponent>
        <div class="card bg-postBG w-9/12 min-h-[20rem] rounded-none border border-2 border-black relative mx-auto my-16 p-0 m-0 z-0">
            <div class="absolute left-0 top-0">
                <div class="avatar h-16 absolute">
                    <div class="bg-white z-10 w-48 h-48 border-2 transition-all duration-150 ease-in-out border-black shadow-BoxBlackSm hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none hover:border-t-1 hover:border-l-1">
                        <div v-if="imageCreator=='Loading'" class="h-full flex justify-center align-center">
                            <button  class="m-auto btn btn-square loading"></button>
                        </div>
                        <img v-else :src='imageCreator' />
                    </div>
                </div>
            </div>
            <div class="flex w-full h-full">
                <div class="w-48 mt-48 justify-center flex">
                    <div class="flex flex-col my-16 ml-3 gap-5">
                        <div class="flex gap-2">
                            <Arrowup :class="[MyVotes == 1?'fill-main3':'']" class="hover:fill-main3" @click="VoteHandler(1)"></Arrowup>
                            <Arrowdown :class="[MyVotes ==-1?'fill-Alert':'']" class="hover:fill-Alert" @click="VoteHandler(-1)"></Arrowdown>
                        </div>
                        <div class="flex justify-center">
                            <div class="btn text-lg btn-sm  text-white min-w-[3rem] w-3" :class="[sScore>0?'btn-success bg-main3':'btn-error bg-Alert']">{{sScore}}</div>
                        </div>
                    </div>
                </div>
                <div class="grow">
                    <div class="mx-10 mt-10 h-fit min-h-[9rem] border-b-2 border-black flex flex-col">
                        <div class="flex justify-between">
                            <h1 class="text-2xl text-left text-main1 font-bold capitalize">{{Creator}}</h1>
                            <div class="dropdown dropdown-end" v-if="postFull && mine">
                                <button tabindex="0"  class="btn btn-ghost btn-sm">
                                    <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
                                </button>
                                <ul tabindex="0" class="dropdown-content border-2 border-black menu p-1 shadow bg-base-100 rounded-none w-20">
                                    <li class="text-sm font-extrabold text-center btn btn-ghost btn-sm self-center w-full">Edit</li>
                                    <li class="text-xs text-Alert font-extrabold btn btn-ghost btn-sm self-center w-full" @click="ModalDeleteShow=true">Delete</li>
                                </ul>
                            </div>
        
                        </div>
                        <h2 class="text-black text-left text-4xl font-bold normal-case mt-2">{{ postTitle +'?' }}</h2>
                        <div class="grow"></div>
                        <p class="text-Grey justify-self-end font-light text-lg text-left">{{ AnswerCount + " ANSWERS - "}}   {{ sScore +" SCORE" }}</p>
                    </div>
                    <div class="mx-10 mt-4">
                        <template v-for="(e,i) in Hashtags" :key="i">
                            <button class="btn btn-sm w-fit m-2 border-none font-light" :class="[i%2? 'bg-main3' : 'bg-main1']">{{ e }}</button>
                        </template>
                    </div>
                    <div id="PostCont" :class="[!postFull?'max-h-[6rem]':'']" v-html="PostContent" class="mx-10 mb-10 overflow-hidden">
                        
                    </div>
                    <div class="flex justify-end m-10 shadow-none">
                        <div id="FlagBtn" class="btn bg-white text-Alert post capitalize border-Alert border-2 hover:bg-Alert hover:border-Alert hover:text-white self-end flex justify-between align-center hover:fill-white shadow-none">
                            <flag04 class="mt-1 mr-1 shadow-none"></flag04>
                            <button >Report post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <h1> {{UpVotes+ DownVotes}}</h1> -->
</template>

<style scoped>
    /* #PostCont{
        font-size: 1.12rem !important;
    } */
    #FlagBtn:hover .svg_flag{
        filter: brightness(0) invert(1);
    }
</style>