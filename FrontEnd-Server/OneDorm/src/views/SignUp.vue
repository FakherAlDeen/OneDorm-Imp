<script setup>
import { ref, computed } from 'vue'
import HeaderSignLog from '../components/HeaderSignLog.vue'
import {PageStore} from '../stores/PageStore'
import Google_Icon from '../components/icons/Google_Icon.vue'
const Store = PageStore();
Store.ChangePage('Sign Up')
const input_styling ="Input-Primary my-2"
const transitionClass ="transition ease-in-out delay-150 hover:scale-[1.02]"
const StringPage= (Store.Page).toUpperCase() ;
</script>

<template>
  <main class="w-full flex-1 flex-col my-8 box-border">
    <HeaderSignLog/>
    <nav class="flex flex-1 w-full z-10	">
      <div class="flex flex-col mt-[6rem] grow mr-40">
        <h1 class="font-bold"><span class="font-bold">CREATE</span> AN</h1>
        <h1 class="mb-8"> ACCOUNT.</h1>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Name"/>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Email"/>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Password"/>
        <input type="text" :class="[input_styling, transitionClass]" placeholder="Repeat it."/>
        <button class="Button_Primary my-2" :class="transitionClass">CREATE ACCOUNT</button>
        <button class="Button_Primary_White my-2 focus:bg-[]" :class="transitionClass"><Google_Icon/>SIGN UP WITH GOOGLE</button>
      </div>
      <h2 class="StringPage rotate-[-90deg] w-fit fixed top-[38rem] right-[16.1rem]">{{(StringPage+' - ').repeat(4) }} <span class="font-bold">{{ StringPage }}</span> {{ (' - ' + StringPage) }}</h2>
      <div class="ml-[20rem] mr-10 mt-4 h-[44.875rem] w-[26rem] bg-[url('./src/assets/Rectangle_5.svg')] Box_Shadow">
      </div>
    </nav>
    <div class="w-[40rem] h-[40rem] rounded-full top-[34rem] right-[90rem] Pattern fixed z-0"></div>
  </main>
</template>
