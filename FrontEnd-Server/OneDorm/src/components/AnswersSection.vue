<script setup>
import { UserStore } from '../stores/UserStore'
import flag04 from './icons/Post_icons/flag-04.vue';
import Arrowup from './icons/Post_icons/ArrowUp.vue'
import Arrowdown from './icons/Post_icons/ArrowDown.vue'
import Comment from './icons/Post_icons/CommentIcon.vue'
import { onMounted, ref , watch} from 'vue';
import QuillComp from './QuilllComp.vue'

const v = ref("<p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah <p>")
v.value=v.value.replaceAll('<p>', "<p class='text-lg font-bold my-1'>")
v.value=v.value.replaceAll('<br>', "")
const Reply=ref(false);
const ReplyHandler = () =>{
    Reply.value = !Reply.value;
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
                <h2 class="text-2xl font-extrabold">Ahmad <span class="text-base text-Grey font-extrabold ml-2">50 min ago</span></h2>
                <h2 class="text-base text-Grey font-extrabold">PSUT - CS student - 122 answers</h2>
            </div>
            <div v-html="v">
                
            </div>
            <div class="flex gap-0 h-fit items-center">
                <Arrowup class="w-9 h-9"/>
                <Arrowdown class="w-9 h-9"/>
                <p class="text-xl font-bold mx-4">2</p>
                <div class="btn-ghost btn">

                    <Comment class="w-7 h-7"/>
                </div>
                <p class="text-lg font-bold mx-2 ml-2 btn-ghost btn" @click="ReplyHandler">Reply</p>
                <p class="text-lg font-bold btn-ghost btn" >Share</p>
                <p class="text-lg font-bold text-Alert btn-ghost btn">Report</p>
            </div>
            <div v-if = "Reply" class="h-[6rem] my-4 mb-16">
                <QuillComp/>
            </div>
            <slot name="Content">
            </slot>
        </div>
    </div>
</template>