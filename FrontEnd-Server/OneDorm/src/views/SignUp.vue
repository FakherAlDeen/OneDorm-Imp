<script setup>
import { ref } from 'vue'
import HeaderSignLog from '../components/HeaderSignLog.vue'
import {PageStore} from '../stores/PageStore'
import Google_Icon from '../components/icons/Google_Icon.vue'
import Alert from '../components/Alert.vue'
import { ValidateEmpty , ValidateEmail , ValidatePassword} from '../Helpers/Validate'
import { UserStore } from '../stores/UserStore'
import router from '../router'



const pageStore = PageStore();
const userStore = UserStore();
pageStore.ChangePage('Sign Up')
const input_styling ="Input-Primary my-2"
const transitionClass ="transition ease-in-out delay-150 hover:scale-[1.02]"
const StringPage= (pageStore.Page).toUpperCase() ;
const Fname = ref('');
const Lname = ref('');
const Email = ref('');
const Password = ref('');
const Password2 = ref('');

const error = ref([]);
async function CreatAccHandler(){
  userStore.error=null;
  error.value=[];
  ValidateEmpty(Fname.value,'First Name') && error.value.push(ValidateEmpty(Fname.value,'First Name'));
  ValidateEmpty(Lname.value,'Last Name') && error.value.push(ValidateEmpty(Lname.value,'Last Name'));
  ValidateEmpty(Email.value,'Email') && error.value.push(ValidateEmpty(Email.value,'Email'));
  ValidateEmpty(Password.value,'Password') && error.value.push(ValidateEmpty(Password.value,'Password'));
  ValidateEmpty(Password2.value,'Password') && error.value.push(ValidateEmpty(Password2.value,'Password'));
  ValidateEmail(Email.value) && error.value.push(ValidateEmail(Email.value))
  ValidatePassword(Password.value) && error.value.push(ValidatePassword(Password.value))
  if (Password.value != Password2.value) {error.value.push("Passwords Does not match!"); }
  if (error.value.length != 0) return;
  
  const data ={
    Fname:Fname.value,
    Lname:Lname.value,
    Email:Email.value,
    Password:Password.value
  }
  const res = await userStore.SignUp(data);
  if (res.status == '201')
    router.push('/NewsFeed');
  console.log(userStore.GetUserData)
}

</script>

<template>
  <main class="w-full flex-1 flex-col my-6 box-border">
    <HeaderSignLog to_Btn="/Login">
      <template #BtnName>LOG IN</template>
    </HeaderSignLog>
    <nav class="flex flex-1 w-full z-10	">
      <div class="flex flex-col mt-[6rem] grow mr-40">
        <h1 class="font-bold"><span class="font-bold">CREATE</span> AN</h1>
        <h1 class="mb-8"> ACCOUNT.</h1>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="First Name" v-model="Fname"/>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Last Name" v-model="Lname"/>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Email" v-model="Email"/>
        <input type="password" :class="[input_styling, transitionClass]" placeholder="Password" v-model="Password"/>
        <input type="password" :class="[input_styling, transitionClass]" placeholder="Repeat it." v-model="Password2"/>
        <Alert classProp="alert-error"  v-if="error.length !=0"><template #Error_Message>{{ error[0] }}</template></Alert>
        <Alert classProp="alert-warning"  v-if="userStore.error!=null"><template #Error_Message>{{ userStore.error }}</template></Alert>
        <button class="Button_Primary my-2" :class="transitionClass" @click="CreatAccHandler">CREATE ACCOUNT</button>
        <button class="Button_Primary_White my-2 focus:bg-[]" :class="transitionClass"><Google_Icon/>SIGN UP WITH GOOGLE</button>
      </div>
      <h2 class="StringPage rotate-[-90deg] w-fit fixed top-[38rem] right-[16.1rem]">{{(StringPage+' - ').repeat(4) }} <span class="font-bold">{{ StringPage }}</span> {{ (' - ' + StringPage) }}</h2>
      <div class="ml-[20rem] mr-10 mt-4 h-[44.875rem] w-[26rem] bg-[url('./src/assets/Rectangle_5.png')] Box_Shadow">
      </div>
    </nav>
    <div class="w-[40rem] h-[40rem] rounded-full top-[34rem] right-[90rem] Pattern fixed z-0"></div>
  </main>
</template>
