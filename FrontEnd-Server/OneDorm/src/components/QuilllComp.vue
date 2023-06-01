<script setup>
import { onMounted, ref , watch} from 'vue';
import Quill from 'quill';
import { UserStore } from '../stores/UserStore'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {CreateAnswer} from '../Helpers/APIs/PostAPIs'
import VueCookies from 'vue-cookies'


const props = defineProps({
  AnswerOfAnswerId:String,
  CreatedBy:String,
  PostId:String,
  PostCreator:String,
})
let quill;
const editor = ref();
const delta =ref(null);
const emit = defineEmits({
    
    EmitAnsID:(e)=>{
        return e;
    }
})
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
            userOnly: true
          }
        },
        placeholder: 'WRITE YOUR QUESTION!',
        theme: 'snow'
      }
      )
        delta.value = quill.getContents();
})

const SendClickHanlder = async () =>{
    if (quill.getLength() ==1){
        return;
    }
    const cook= JSON.parse(atob($cookies.get('Token').split('.')[1]))
    const data = {
      CreatedBy:cook.UserId,
      AnswerDetails:JSON.parse(JSON.stringify(quill.getContents())),
      AnswerDetailsHTML: quill.root.innerHTML,
      Id:props.AnswerOfAnswerId ,
      Type:'Answer',
      CreatedAt: Date.now()
    }
    const res = await CreateAnswer(data);
    emit('EmitAnsID', res.data.AnswerId);
    console.log (res.data)
    console.log(res);
    quill.setText('');
    const notification = {
        QuestionId: props.PostId,
        PostCreator:props.PostCreator,
        ParentId: props.CreatedBy,
        Type:'Answer',
        AnswerCreatorName : UserStore().Fname + " " + UserStore().Lname,
        AnswerCreator: UserStore().UserID,
        CreatedAt:Date.now(),
    }
    UserStore().socket.emit('NotificationSend',notification);
  }
</script>
<template>
  <div class="w-full h-full relative">
    <div ref="editor" class="rounded-2 h-[12rem] max-h-[6rem] overflow-y-auto"></div>
    <button class="btn btn-success bottom-[-2rem] right-[1rem] absolute" @click="SendClickHanlder">Send!</button>
  </div>
</template>