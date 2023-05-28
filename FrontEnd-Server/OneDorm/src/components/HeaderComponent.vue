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
import {ref} from 'vue'

const SearchValue = ref();

const SearchClickHanlder = async ()=>{
    console.log (SearchValue.value);
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
    console.log(ShowList.value);
    ShowList.value = ! ShowList.value;
}
const userStore = UserStore();
console.log (userStore.image)
const Logout = ()=>{
    VueCookies.remove('Token')
    router.push('/Login')
}
</script>

<template>
    <div class="navbar bg-base-100 p-10">
        <div class="navbar-start">
            <div class="mr-9">
                <a class="w-fit h-fit btn btn-ghost p-0" @click="router.push('/NewsFeed')"><OneDorm class="border-black border-2 w-20 h-20"></OneDorm></a>
            </div>
            <div class="dropdown dropdown-center">
                <label tabindex="0" class="btn btn-ghost rounded-none">
                    <div class="indicator">
                        <div class="flex flex-row gap-3">
                            <p class="font-semibold text-base text-black">MY HASHTAGS</p>
                            <Arrow_Bottom_Black class="self-center"/>
                        </div>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 border-black bg-main2 shadow rounded-none border-2	">
                    <div class="card-body">
                    <span class="font-bold text-xl text-black">Your Hashatgs!</span>
                    <div class="divider before:bg-black after:bg-black m-0"></div> 
                    <ul class="menu bg-base-100 w-full rounded-box overflow-y-auto">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                    </div>
                </div>
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
                <a class="btn btn-circle btn-outline btn-sm" >
                    <FilterIcon/>
                </a>
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
            <div class="btn btn-ghost px-1 indicator">
                <span class="indicator-item badge badge-secondary top-2 right-2 text-sm bg-Alert border-Alert">99</span>
                <NotifcationIcon/>
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
                    <li class="text-white" @click="router.push('/profile')"><a>profile</a></li>
                    <li class="text-Alert" @click="Logout"><a>Log out</a></li>
                </ul>
                
            </div>

        </div>
    </div>
</template>