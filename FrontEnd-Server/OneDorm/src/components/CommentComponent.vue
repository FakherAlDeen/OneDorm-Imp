<script setup>
import { onMounted, ref , watch} from 'vue';
import Quill from 'quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { UserStore } from '../stores/UserStore'
import {CreateAnswer} from '../Helpers/APIs/PostAPIs'
const props = defineProps({
    QuestionId:String,
    PostCreator:String,
})

const emit =defineEmits({
    EmitAnsID:(e)=>{
        return e;
    }

})

let quill;
const delta =ref(null);
onMounted(()=>{
    quill = new Quill(document.querySelector('#editor'), {
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
        placeholder: 'Share your thoughts!',
        theme: 'snow' // 'bubble' is also great
      }
      )
        delta.value = quill.getContents();
})
const CommentClickHandler = async () =>{
    if (quill.getLength() ==1){
        return;
    }
    const data = {
        CreatedBy:UserStore().UserID,
        AnswerDetails:JSON.parse(JSON.stringify(quill.getContents())),
        AnswerDetailsHTML: quill.root.innerHTML,
        Id:props.QuestionId ,
        Type:'Question',
        CreatedAt: Date.now()
    }
    const res = await CreateAnswer(data);
    emit('EmitAnsID', res.data.AnswerId);
    console.log(res);
    quill.setContents([{ insert: '\n' }]);
    const notification = {
        QuestionId: props.QuestionId,
        PostCreator:props.PostCreator,
        Type:'Question',
        AnswerCreatorName : UserStore().Fname + " " + UserStore().Lname,
        AnswerCreator: UserStore().UserID,
        CreatedAt:Date.now(),
    }
    UserStore().socket.emit('NotificationSend',notification);
};

</script>
<template>
    <div class="card bg-Yellow w-8/12 rounded-none border border-[0.2rem]  border-black relative mx-auto my-10">
        <div class="m-10 mt-[3.7rem] p-4 border-black border-[0.2rem] bg-white rounded-[1rem] relative h-[18rem]">
            <div class="avatar absolute z-10 top-[-2.5rem] left-[-1.2rem] items-center">
                <div class="w-16 rounded-xl border-2 border-black">
                    <img :src="UserStore().image" />
                </div>
                <p class="mb-5 text-xl ml-2">As <span class="font-extrabold">{{ UserStore().Fname + " " +UserStore().Lname +" :" }}</span></p>
            </div>
            <div class="h-[20rem] z-0">
                <div id="editor" class="rounded-2 h-[12rem] max-h-[12rem] overflow-y-auto"></div>
            </div>
            <button class="btn btn-block w-[11.5rem] h-[4rem] absolute btn-success font-black px-10 border-black border-[0.185rem] rounded-[1rem] bg-main3 bottom-[-1.6rem] right-[2rem]" @click="CommentClickHandler"><p class="text-2xl font-[1000] text-white">comment!</p></button>
        </div>
    </div>
</template>