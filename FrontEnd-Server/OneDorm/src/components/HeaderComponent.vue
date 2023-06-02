<script setup>
import OneDorm from '../assets/icons/OneDorm.vue'
import Arrow_Bottom_Black from '../assets/icons/Header_icons/Arrow_BottomBlack.vue';
import FilterIcon from '../assets/icons/Header_icons/Search/Filter.vue'
import searchIcon from '../assets/icons/Header_icons/Search/Search.vue'
import PlusIcon from '../assets/icons/Header_icons/PlusIcon.vue'
import ChatIcon from '../assets/icons/Header_icons/ChatIcon.vue'
import NotifcationIcon from '../assets/icons/Header_icons/NotificationIcon.vue'
import HappyFace from '../assets/icons/Header_icons/HappyFace.vue'
import Arrow_Bottom_White from '../assets/icons/Header_icons/Arrow_BottomWhite.vue'
import { UserStore } from '../stores/UserStore'
import router from '../router/index'
import {SearchPost} from '../Helpers/APIs/SearchAPIs'
import VueCookies from 'vue-cookies'
import {ref, onBeforeMount} from 'vue'
import {Notification,OpenNotification} from '../Helpers/APIs/NotificationAPIs'
import { useTimeAgo } from '@vueuse/core'

const SearchValue = ref();
const showDrawer = ref (false);
const ShowNotification=ref(false);
const NotificationArr = ref([]);
UserStore().socket.on('Notifications',async(msg)=>{
    // console.log ('meow',msg);
    const res = await Notification(msg);
    NotificationArr.value.unshift(res.data);
})

const ShowNotificationHandler=async()=>{
    ShowNotification.value=!ShowNotification.value;
    for (let i=0;i<NotificationArr.value.length;i++){
        if (NotificationArr.value[i].status == 'Inactive'){
            const res = await OpenNotification(NotificationArr.value[i].NotificationId);
            // console.log (res);
        }
    }
}
onBeforeMount(async()=>{
    // console.log (UserStore().NotificationList)
    for (let i=0;i<UserStore().NotificationList.length;i++){
        const res = await Notification(UserStore().NotificationList[i])
        // console.log (res);
        const timeAgo = useTimeAgo(new Date(res.data.CreatedAt))
        // console.log (timeAgo.value);
        NotificationArr.value.push(res.data);
    }
    NotificationArr.value=NotificationArr.value.reverse();
})
const SearchClickHanlder = async ()=>{
    // console.log (SearchValue.value);
    // router.push(`/SearchResult/${SearchValue.value}`);

    router.push(
    {name: 'Search',
    params: {
        SearchVal: SearchValue.value,
    }}).then(() => { router.go() })
}
const CreatePost = ()=>{
    router.push('/CreatePost')
}
const ShowList = ref(false);
const ClickHanlderShowList = ()=>{
    // console.log(ShowList.value);
    ShowList.value = ! ShowList.value;
}
const userStore = UserStore();
// console.log (userStore.image)
const Logout = ()=>{
    VueCookies.remove('Token')
    router.push('/Login')
}
const PushRoute = (e)=>{
    router.push ({
        name: 'Post',
        params: {
            QuestionId: e,
        }
    })
}
const arr = ref ([]);
for (let i=0;i<30;i++){
    arr.value.push('#psut');
}
</script>

<template>
    <div class="navbar bg-base-100 p-10 z-10">
        <Transition name="slide-fade">
            <div class="drawer-side fixed z-10 left-0 top-0 border-r-2 border-black w-screen" v-if="showDrawer">
                <div class="flex">
                    <div class="h-screen p-4 w-80 bg-black bg-opacity-20">
                        <div class="ContHash bg-white shadow-BoxBlackSm border-2 border-black p-4 m-1">
                            <h2 class="text-2xl font-extrabold mx-3 mt-2 border-b-2 pb-3 mb-3 border-black">My Hashtags</h2>
                            <div class=" text-base-content h-[44.3vw] overflow-y-auto text-center">
                                <template v-for="(e,i) in UserStore().CategoriesList" :key="e">
                                    <div 
                                    class="btn btn-wide my-1 w-11/12 btn-success bg-main3 text-white" 
                                    :class="[i%2==0?'':'']">
                                    {{e}}
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grow bg-black bg-opacity-20 h-screen" @click="showDrawer=false"></div>
            </div>
        </Transition>
        <div class="navbar-start">
            <div class="mr-9">
                <a class="w-fit h-fit btn btn-ghost p-0" @click="router.push('/NewsFeed')"><OneDorm class="border-black border-2 w-20 h-20"></OneDorm></a>
            </div>
            <div class="dropdown dropdown-center">
                <label tabindex="0" class="btn btn-ghost rounded-none" @click = "showDrawer=!showDrawer">
                    <div class="indicator">
                        <div class="flex flex-row gap-3">
                            <p class="font-semibold text-base text-black">MY HASHTAGS</p>
                            <Arrow_Bottom_Black class="self-center " :class="[showDrawer?'rotate-90':'rotate-[-90deg]']"/>
                        </div>
                    </div>
                </label>
            </div>
        </div>
        <div class="navbar-center">
            <div class="flex w-96 rounded-lg h-12 p-2 bg-black align-center flex-wrap flex-row card">
                <a class="btn btn-circle btn-outline btn-sm" @click="SearchClickHanlder">
                    <searchIcon/>
                </a>
                <div class="grow">
                    <input v-model="SearchValue" class="h-full bg-transparent input grow placeholder:text-white placeholder:font-light text-white" type="text" placeholder="search..">
                </div>
                <!-- <a class="btn btn-circle btn-outline btn-sm" >
                    <FilterIcon/>
                </a> -->
            </div>

        </div>
        <div class="navbar-end flex gap-3 dropdown dropdown-end">
            <div class="btn btn-sm bg-black p-1 px-3 min-h-fit" @click="CreatePost">
                <PlusIcon/>
            </div>
            <div class="btn btn-ghost px-1 indicator">
                <span class="indicator-item badge badge-secondary top-2 right-2 text-sm bg-Alert border-Alert">99</span>
                <ChatIcon/>
            </div>
            <div class="relative" >
                <div class="btn btn-ghost px-1 indicator " @click="ShowNotificationHandler">
                    <span class="indicator-item badge badge-secondary top-2 right-2 text-sm bg-Alert border-Alert" v-if="NotificationArr.filter(e=>e.status=='Inactive').length>0">{{ NotificationArr.filter(e=>e.status=='Inactive').length }}</span>
                    <NotifcationIcon/>
                </div>
                <div class="w-80 bg-white border-2 border-black absolute h-[22rem] top-16 right-0 z-20 shadow-BoxBlackSm flex flex-col" v-if="ShowNotification">
                    <h2 class="text-2xl font-extrabold mx-3 mt-2 border-b-2 pb-3 mb-3 border-black capitalize text-left mt-3">Notifications</h2>
                    <div class="grow m-3 overflow-y-auto">
                        <template v-for="e in NotificationArr" :key="e.NotificationId">
                            <div class="card w-full mb-3 p-4 cursor-pointer" :class="[e.status=='Inactive'?'bg-main1':'bg-Grey2']" @click="PushRoute(e.NotificationDetails.redirectLink)">
                                <h2 class="card-title text-2xl capitalize text-black">
                                    {{ e.NotificationTitle +"!" }}
                                </h2>
                                <h2 class="card-title font-light text-black text-gray-800">
                                
                                <template v-if = "e.NotificationDetails.ReplytoAns">
                                    replied on your 
                                    Answer!
                                </template>
                                <template v-else>
                                    answered on your 
                                    question!
                                </template>
                                </h2>
                                <p class="font-light text-white text-xs self-end">{{ useTimeAgo(new Date(e.CreatedAt)) }}</p>
                            </div>
                        </template>
                        <div v-if="NotificationArr.length==0" class="my-7 flex flex-col gap-5 items-center justify-center">
                            <p class=" text-lg">no notifications yet!</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="7em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M352 493.4c-29.6 12-62.1 18.6-96 18.6s-66.4-6.6-96-18.6V288c0-8.8-7.2-16-16-16s-16 7.2-16 16V477.8C51.5 433.5 0 350.8 0 256C0 114.6 114.6 0 256 0S512 114.6 512 256c0 94.8-51.5 177.5-128 221.8V288c0-8.8-7.2-16-16-16s-16 7.2-16 16V493.4zM195.2 233.6c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2c17.6-23.5 52.8-23.5 70.4 0zm121.6 0c17.6-23.5 52.8-23.5 70.4 0c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2zM208 336v32c0 26.5 21.5 48 48 48s48-21.5 48-48V336c0-26.5-21.5-48-48-48s-48 21.5-48 48z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex h-20 bg-black flex place-content-center static gap-2 ml-4">
                <div class="avatar h-16 self-center asbolute right-2 indicator ">
                    <span class="indicator-item indicator-bottom badge badge-secondary bg-main3 border-main3 bottom-2 right-1"></span> 
                    <div class="w-16 h-16">
                        <img :src="userStore.image" />
                    </div>
                </div>
                <div class="flex flex-col h-fit self-center justify-center">
                    <HappyFace/>
                    <p class="text-main2 text-center">29+</p>
                </div>
                <div  tabindex="0" class="btn btn-cirle btn-ghost btn-sm self-center pr-1" @click="ClickHanlderShowList">
                    <Arrow_Bottom_White/>
                </div>
                <ul tabindex="0" class="mt-20 dropdown-content menu p-2 shadow bg-black w-52 dropdown-open" :class="[ShowList?'dropdown-open':'']">
                    <li class="text-white" @click="router.push('/profile')"><a>Profile</a></li>
                    <li class="text-Alert" @click="Logout"><a>Log out</a></li>
                </ul>
                
            </div>

        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;

}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.ContHash{
    animation-delay: 10s;
    animation: mymove 0.5s;
}

@keyframes mymove {
    from {box-shadow: none;}
    to {box-shadow:0.5rem 0.5rem #000000;}
}
</style>