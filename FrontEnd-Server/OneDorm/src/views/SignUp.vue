<script setup>
import { ref, computed } from 'vue'
import HeaderSignLog from '../components/HeaderSignLog.vue'
import {PageStore} from '../stores/PageStore'
import Google_Icon from '../components/icons/Google_Icon.vue'
const Store = PageStore();
Store.ChangePage('Sign Up')
console.log (Store.Page)
const input_styling ="Input-Primary my-2"
const StringPage= (Store.Page).toUpperCase() ;
</script>

<template>
  <main class="w-full flex-1 flex-col my-8 box-border">
    <HeaderSignLog/>
    <nav class="flex flex-1 w-full z-10	">
      <div class="flex flex-col mt-[6rem] grow mr-40">
        <h1 class="font-bold"><span class="font-bold">CREATE</span> AN</h1>
        <h1 class="mb-8"> ACCOUNT.</h1>
        <input type="text" :class="input_styling" placeholder="Name"/>
        <input type="text" :class="input_styling" placeholder="Email"/>
        <input type="text" :class="input_styling" placeholder="Password"/>
        <input type="text" :class="input_styling" placeholder="Repeat it."/>
        <button class="Button_Primary my-2">CREATE ACCOUNT</button>
        <button class="Button_Primary_White my-2"><Google_Icon/>SIGN IN WITH GOOGLE</button>
      </div>
      <h2 class="StringPage rotate-[-90deg] w-fit fixed top-[38rem] right-[16.1rem]">{{(StringPage+' - ').repeat(4) }} <span class="font-bold">{{ StringPage }}</span> {{ (' - ' + StringPage) }}</h2>
      <div class="ml-[20rem] mr-10 mt-4 h-[44.875rem] w-[26rem] bg-[url('./src/assets/Rectangle_5.svg')] Box_Shadow">
      </div>
    </nav>
    <!-- <p>{}</p> -->
    <div class="w-[40rem] h-[40rem] rounded-full top-[34rem] right-[90rem] Pattern fixed z-0"></div>
  </main>
</template>
