<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import { ref, computed } from 'vue'
import {PageStore} from '../stores/PageStore'
import { QuestionStore } from '../stores/QuestionStore'
import { ValidateEmpty } from '../Helpers/Validate'
import PostCreate from '../components/PostCreate.vue';

const questionStore = QuestionStore();
// const Store = PageStore();
// Store.ChangePage('Log In')
const input_styling ="Input-Primary my-2"
const transitionClass ="transition ease-in-out delay-150 hover:scale-[1.02]"

const Content = ref('');
const error = ref([]);

async function CreatePostClick(){
  questionStore.error=null;
  error.value=[];
//   ValidateEmpty(Content.value,'Content') && error.value.push(ValidateEmpty(Content.value,'Content'));
  if (error.value.length != 0) return;
  const data ={ // send the user id(created by), post title and post content 
    CreatedBy:'11',
    QuestionTitle: 'me is title',
    QuestionDetails: 'detailssss plz'
  }
  await questionStore.CreatePost(data)
//   console.log(userStore.GetUserData)
}

</script>
<template>
    <main>
        <HeaderComponent></HeaderComponent>
        <!-- <button class="Button_Primary my-2" :class="transitionClass" @click="CreatePostClick">Share</button> -->
        <PostCreate></PostCreate>
    </main>
</template>