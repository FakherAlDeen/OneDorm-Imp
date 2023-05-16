<script setup>
import { onMounted, ref , watch} from 'vue';
import Quill from 'quill';
import { UserStore } from '../stores/UserStore'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {CreateAnswer} from '../Helpers/APIs/PostAPIs'

const props = defineProps({
  AnswerOfAnswerId:String
})

let quill;
const editor = ref();
const delta =ref(null);
onMounted(()=>{
    quill = new Quill(editor.value, {
        modules: {
          toolbar: [
            // adding some basic Quill content features
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ],
          history: {
            // Local undo shouldn't undo changes
            // from remote users
            userOnly: true
          }
        },
        placeholder: 'WRITE YOUR QUESTION!',
        theme: 'snow' // 'bubble' is also great
      }
      )
        delta.value = quill.getContents();
})

const SendClickHanlder = async () =>{
  if (quill.getLength() ==1){
        return;
    }
    const data = {
        CreatedBy:UserStore().UserID,
        AnswerDetails:JSON.parse(JSON.stringify(quill.getContents())),
        AnswerDetailsHTML: quill.root.innerHTML,
        Id:props.AnswerOfAnswerId ,
        Type:'Answer'
    }
    const res = await CreateAnswer(data);
    console.log(res);
}
</script>
<template>
  <div class="w-full h-full relative">
    <div ref="editor" class="rounded-2 h-[12rem] max-h-[6rem] overflow-y-auto"></div>
    <button class="btn btn-success bottom-[-2rem] right-[1rem] absolute" @click="SendClickHanlder">Send!</button>
  </div>
</template>