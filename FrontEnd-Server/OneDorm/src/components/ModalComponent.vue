<script setup>
const props = defineProps({
    withBtn1:Boolean,
    withBtn2:Boolean,
    Btn1Cont:String,
    Btn2Cont:String,
    ModalContentHeader:String,
    ModalContent:String,
    Btn1Funtion: Function,
    Btn2Funtion: Function,
    withoutCancel : Boolean,
})
console.log(props.Btn1Cont)
const emit =defineEmits(['emitClose','Func1','Func2'])
</script>

<template>
    <div class="modal" id="my-modal-2">
        <div class="modal-box">
            <h3 class="font-bold text-2xl">{{ModalContentHeader}}</h3>
            <p class="pt-4">{{ ModalContent }}</p>
            <slot name = "content"></slot>
            <div class="modal-action">
            <button class="btn" v-if="withBtn1" @click="emit('Func1')">{{ Btn1Cont }}</button>
            <button class="btn" v-if="withBtn2" @click="Btn2Funtion">{{ Btn2Cont }}</button>
            <button v-if="!withoutCancel" class="btn btn-error" @click="emit('emitClose')">close</button>
            </div>
        </div>
    </div>
</template>