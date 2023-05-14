<script setup>
import { ref, computed } from 'vue'
import HeaderSignLog from '../components/HeaderSignLog.vue'
import {PageStore} from '../stores/PageStore'
import Google_Icon from '../components/icons/Google_Icon.vue'
import { UserStore } from '../stores/UserStore'
import { ValidateEmpty , ValidateEmail , ValidatePassword} from '../Helpers/Validate'

const userStore = UserStore();
const Store = PageStore();
Store.ChangePage('Log In')
const input_styling ="Input-Primary my-2"
const transitionClass ="transition ease-in-out delay-150 hover:scale-[1.02]"
const StringPage = (Store.Page).toUpperCase() ;

const Email = ref('');
const Password = ref('');

const error = ref([]);
async function LoginClick(){
  userStore.error=null;
  error.value=[];
  ValidateEmpty(Email.value,'Email') && error.value.push(ValidateEmpty(Email.value,'Email'));
  ValidateEmpty(Password.value,'Password') && error.value.push(ValidateEmpty(Password.value,'Password'));
  if (error.value.length != 0) return;
  const data ={
    Email:Email.value,
    Password:Password.value
  }
  await userStore.Login(data)
  console.log(userStore.GetUserData)
}

</script>

<template>
  <main class="w-full flex-1 flex-col my-8 box-border">
    <HeaderSignLog to_Btn="/Signup">
      <template #BtnName>SIGN UP</template>
    </HeaderSignLog>
    <nav class="flex flex-1 w-full z-10	">
      <div class="flex flex-col mt-[6rem] grow mr-40">
        <h1 class="font-bold"><span class="font-bold">WELCOME</span></h1>
        <h1 class="mb-8"> BACK</h1>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Email" v-model="Email"/>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Password" v-model="Password"/>
        <div class="flex items-start my-2">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" class="w-4 h-4 checkbox ml-1" required="">
            </div>
            <div class="ml-3 text-sm">
                <label for="remember" class="font-bold remember"> Remember Me </label>
            </div>
            <label class="font-bold remember text-sm ml-auto mr-1" >  Forgot Password? </label>
        </div>
        
        <button class="Button_Primary my-2" :class="transitionClass" @click="LoginClick">SIGN IN</button>
        <button class="Button_Primary_White my-2 focus:bg-[]" :class="transitionClass"><Google_Icon/>SIGN IN WITH GOOGLE</button>
      </div>
      <h2 class="StringPage rotate-[-90deg] w-fit fixed top-[38rem] right-[16.1rem]">{{(StringPage+' - ').repeat(4) }} <span class="font-bold">{{ StringPage }}</span> {{ (' - ' + StringPage) }}</h2>
      <div class="ml-[20rem] mr-10 mt-4 h-[44.875rem] w-[26rem] bg-[url('./src/assets/Rectangle_5Login.svg')] Box_Shadow">
      </div>
    </nav>
    <div class="w-[40rem] h-[40rem] rounded-full top-[34rem] right-[90rem] Pattern fixed z-0"></div>
  </main>
</template>

