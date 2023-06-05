<script setup>
import { UserStore } from '../stores/UserStore'
import flag04 from '../assets/icons/Post_icons/flag-04.vue';
import Arrowup from '../assets/icons/Post_icons/ArrowUp.vue'
import Arrowdown from '../assets/icons/Post_icons/ArrowDown.vue'
import { GetUser } from '../Helpers/APIs/UserAPIs';
import {DeleteBlog, BlogVote} from '../Helpers/APIs/BlogAPIs'
import { ref ,onBeforeMount} from 'vue'
import ModalComponent from './ModalComponent.vue';
import router from '../router';

    const props = defineProps({
        BlogID:String,
        BlogTitle:String,
        BlogContent:String,
        Score: Number,
        BlogFull:Boolean,
        AnswerCount:Number,
        CreatorName:String,
        CreatedBy:String,
    })
    const mine = ref (props.CreatedBy==UserStore().UserID)
    console.log (props.BlogFull)
    const Creator = ref (props.CreatorName);
    const UserVotes= UserStore().UserVotes;
    const ModalDeleteShow = ref (false);
    const imageCreator = ref ('Loading');
    const sScore = ref (props.Score)


    const MyVotes = ref (0);
    if (UserVotes){
        MyVotes.value = UserVotes[props.BlogID]?UserVotes[props.BlogID]:0
    }
    const VoteHandler = async (e)=>{
        if (MyVotes.value == e) return;
        if (MyVotes.value != e  && MyVotes.value!= 0){
            sScore.value += e;
        }
        sScore.value+=e;
        MyVotes.value =e;
        UserVotes[props.BlogID] = MyVotes.value
        const data = {
            UserId: UserStore().UserID,
            Id : props.BlogID,
            VoteValue: e,
        }
        await BlogVote(data)
    }
    const userdata = ref ('');
    onBeforeMount(async () =>{
        const res = await GetUser(props.CreatedBy);
        userdata.value = res.data;
        Creator.value = res.data.Fname?res.data.Fname + " " + res.data.Lname:'UNKOWN';
        if (res.data.Image){
            imageCreator.value = `data:${res.data.Image.contentType};base64,${res.data.Image.image}`
        }else {
            imageCreator.value = 'https://i.ibb.co/g39WZXc/User-1.png';
        }
    })
    const DeleteBlogHanlder = async ()=>{
        console.log(props.BlogID)
        await DeleteBlog({Id:props.BlogID , Type:'Blog'});
        router.push('/NewsFeed');
        ModalDeleteShow.value=false
    }
    const BlogEdit = ()=>{
        router.push({
            name: 'EditBlog',
            params: {
                BlogId: props.BlogID,
            }
        });
    }
    const OpenUserPorfileHandler=async()=>{
        if (props.CreatedBy == UserStore().UserID){
            router.push('/profile');
        }else{
            router.push({
                name: 'UserProfile',
                params: {
                    UserId: props.CreatedBy,
                }
            });
        }
    }
</script>


<template>
    <div>
        <ModalComponent @emit-close="ModalDeleteShow=false" :class="[ModalDeleteShow? 'modal-open' : '']" @Func1="DeleteBlogHanlder" ModalContent="Are you sure you wanna delete your blog ?" ModalContentHeader="Are you sure!" Btn1Cont="Delete!" :with-btn1="true"></ModalComponent>
        <div class="card bg-postBG w-full min-h-[20rem] rounded-none border border-2 border-black relative mx-auto my-16 p-0 m-0 z-0">
            <div class="w-full h-full bg-transparent z-10 absolute" v-if="!BlogFull"></div>
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
                <div class="w-1/6 mt-48 justify-center flex">
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
                <div class="w-5/6 ml-4">
                    <div class="mx-10 mt-10 h-fit min-h-[9rem] border-b-2 border-black flex flex-col">
                        <div class="flex justify-between">
                            <!-- <h1 class="text-2xl text-left text-main1 font-bold capitalize cursor-pointer hover:underline" @click="OpenUserPorfileHandler">{{Creator}}</h1> -->
                            <div class="flex flex-col">
                                <h2 class="w-fit text-black text-left text-2xl font-bold normal-case mt-2 p-2 bg-main2 border-black border-2 hover:shadow-BoxBlackSm transition-all duration-150 ease-in-out">Academic Blog</h2>
                                <h2 class="text-black text-left text-5xl font-bold normal-case mt-2 mb-2">{{ BlogTitle }}</h2>
                            </div>
                            <div class="dropdown dropdown-end" v-if="BlogFull && mine">
                                <button tabindex="0"  class="btn btn-ghost btn-sm">
                                    <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
                                </button>
                                <ul tabindex="0" class="dropdown-content border-2 border-black menu p-1 shadow bg-base-100 rounded-none w-20">
                                    <li class="text-sm font-extrabold text-center btn btn-ghost btn-sm self-center w-full" @click="BlogEdit">Edit</li>
                                    <li class="text-xs text-Alert font-extrabold btn btn-ghost btn-sm self-center w-full" @click="ModalDeleteShow=true">Delete</li>
                                </ul>
                            </div>
                            
                        </div>
                        <div class=" mr-2 flex items-center gap-2" >
                            <h1 class="text-2xl text-left text-main1 font-bold capitalize cursor-pointer hover:underline" @click="OpenUserPorfileHandler"><span>
                                Blog By:
                            </span> {{Creator}}</h1>
                            <svg class="mt-1" v-if="userdata?.VerificationState == 'active'" fill="#39B97E" xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        </div>
                        <div class="grow"></div>
                        <p class="text-Grey justify-self-end font-light text-lg text-left">{{ AnswerCount + " ANSWERS - "}}   {{ sScore +" SCORE" }}</p>
                    </div>
                    <div id="PostCont" :class="[!BlogFull?'max-h-[6rem]':'']" v-html="BlogContent" class="mx-10 mb-10 overflow-hidden">
                        
                    </div>
                    <div class="grow flex-col flex">

                        <div class="flex justify-end m-10 shadow-none self-end grow">
                            <div id="FlagBtn" class="btn bg-white text-Alert post capitalize border-Alert border-2 hover:bg-Alert hover:border-Alert hover:text-white self-end flex justify-between align-center hover:fill-white shadow-none">
                                <flag04 class="mt-1 mr-1 shadow-none"></flag04>
                                <button >Report blog</button>
                            </div>
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