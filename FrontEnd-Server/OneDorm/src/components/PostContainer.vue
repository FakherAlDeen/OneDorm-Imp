<script setup>
import { UserStore } from '../stores/UserStore'
import flag04 from './icons/Post_icons/flag-04.vue';
import Arrowup from './icons/Post_icons/ArrowUp.vue'
import Arrowdown from './icons/Post_icons/ArrowDown.vue'
import { ref } from 'vue'
    defineProps({
        postTitle:String,
        Hashtags:Array,
        PostContent:String,
        UpVotes: Number,
        DownVotes: Number,
        mine:Boolean,
        postFull:Boolean,
        AnswerCount:Number,
        CreatorName:String,
    })
    const UPDOWNHanlder= ref(0);
</script>


<template>
    <!-- <h1> {{UpVotes+ DownVotes}}</h1> -->
    <div class="card bg-postBG w-9/12 min-h-[20rem] rounded-none border border-2 border-black relative mx-auto my-16 p-0 m-0 z-0">
        <div class="absolute left-0 top-0">
            <div class="avatar h-16 absolute">
                <div class="z-10 w-48 h-48 border-2 transition-all duration-150 ease-in-out border-black shadow-BoxBlackSm hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none hover:border-t-0 hover:border-l-0">
                    <img :src='UserStore().image' />
                </div>
            </div>
        </div>
        <div class="flex w-full h-full">
            <div class="w-48 mt-48 justify-center flex">
                <div class="flex flex-col my-16 ml-3 gap-5">
                    <div class="flex gap-2">
                        <Arrowup :class="[UPDOWNHanlder == 1?'fill-main3':'']" class="hover:fill-main3" @click="UPDOWNHanlder=1"></Arrowup>
                        <Arrowdown :class="[UPDOWNHanlder ==-1?'fill-Alert':'']" class="hover:fill-Alert" @click="UPDOWNHanlder=-1"></Arrowdown>
                    </div>
                    <div class="flex justify-center">
                        <div class="btn text-lg btn-sm  text-white min-w-[3rem] w-3" :class="[UpVotes>DownVotes?'btn-success bg-main3':'btn-error bg-Alert']">{{UpVotes-DownVotes}}</div>
                    </div>
                </div>
            </div>
            <div class="grow">
                <div class="mx-10 mt-10 h-fit min-h-[9rem] border-b-2 border-black flex flex-col">
                    <h1 class="text-2xl text-left text-main1 font-bold capitalize">{{CreatorName}}</h1>
                    <h2 class="text-black text-left text-4xl font-bold normal-case mt-2">{{ postTitle +'?' }}</h2>
                    <div class="grow"></div>
                    <p class="text-Grey justify-self-end font-light text-lg text-left">{{ AnswerCount + " ANSWERS - "}}   {{ UpVotes-DownVotes +" SCORE" }}</p>
                </div>
                <div class="mx-10 mt-4">
                    <template v-for="(e,i) in Hashtags">
                        <button class="btn btn-sm w-fit m-2 border-none font-light" :[key]="i" :class="[i%2? 'bg-main3' : 'bg-main1']">{{ e }}</button>
                    </template>
                </div>
                <div id="PostCont" v-html="PostContent" class="mx-10 mb-10">
                    
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
</template>

<style scoped>
    /* #PostCont{
        font-size: 1.12rem !important;
    } */
    #FlagBtn:hover .svg_flag{
        filter: brightness(0) invert(1);
    }
</style>