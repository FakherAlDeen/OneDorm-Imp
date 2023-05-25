<script setup>
import Button_Basic from '../components/Button_Basic.vue'
import OneDorm from '../assets/icons/OneDorm.vue'
import router from '../router/index';
const Pclass="text-[1.05rem] text-black font-normal px-4 font-[450]";
const props = defineProps(['to_Btn'])

const ClickHandler = ()=>{
  console.log(props.to_Btn)
  router.push(props.to_Btn)
}
</script>

<template>
  <main class="w-full h-full flex-1 flex-col">
    <header class="flex flex-2 items-center top-0 relative w-full left-0 content-center flex-wrap" >
      <a class="pr-4">
        <OneDorm class="border-black border-2 w-[80px] h-[80px]"></OneDorm>
      </a>
      <p><a :class="Pclass">HOME</a></p>
      <p><a :class="Pclass">ABOUT US</a></p>
      <p><a :class="Pclass">CONTACT</a></p>
      <div class="grow"></div>
      <Button_Basic class="w-fit h-fit" @click="ClickHandler">
        <template #Content>
            <p class="text-white">
                <slot name="BtnName">  
                </slot>
            </p>
        </template>
      </Button_Basic>
    </header>
  </main>
</template>
