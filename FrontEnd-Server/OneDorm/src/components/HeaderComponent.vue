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
import {ref, onBeforeMount, watch} from 'vue'
import {Notification,OpenNotification} from '../Helpers/APIs/NotificationAPIs'
import { useTimeAgo,formatTimeAgo } from '@vueuse/core'
import { GetUser } from '../Helpers/APIs/UserAPIs';
import { GetChat } from '../Helpers/APIs/ChatAPIs'

const arrChats = ref (['Ahmad','Moh','wtv','Moh','wtv','Moh','wtv','Moh','wtv','Moh','wtv','Moh','wtv','Moh','wtv','Moh','wtv'])
// const reducedFilter = (data, keys, fn) =>
//   data.filter(fn).map(el =>
//     keys.reduce((acc, key) => {
//       acc[key] = el[key];
//       return acc;
//     }, {})
//   );
const SearchValue = ref();
const showDrawer = ref (false);
const ShowNotification=ref(false);
const NotificationArr = ref([]);
const arrChatNames = ref ({});
const imgChatArr = ref ({});
const loadingChatList = ref(true);
const ChatsList = ref({});
const ChatText = ref('');
const theOneImChattingWith =ref();
const OpenedChat = ref();
const showChatBubbleList = ref(false);
const chatSelected = ref ();
const loading = ref(true);

UserStore().socket.on('Notifications',async(msg)=>{
    // console.log ('meow',msg);
    const res = await Notification(msg);
    NotificationArr.value.unshift(res.data);
})
const props = defineProps({
    open:{type:Boolean, defualt:false},
    PostCreator:String,
})
const emit =defineEmits(['emitClose'])
watch (()=>props.open, (nnew,old)=>{
    showChatList.value = nnew;
})
UserStore().socket.on('NewChat',(msg)=>{
    ChatsList.value[msg.ChatId].ChatArr.push(msg);
})
const SendChatHandler = ()=>{
    if (ChatText.value=='') return;
    const chat = ChatsList.value[theChatImIn.value]
    const data = {
        to:chat.FirstUserId==UserStore().UserID? chat.SecondUserId: chat.FirstUserId,
        from:UserStore().UserID,
        text:ChatText.value,
        CreatedAt:new Date(),
        ChatId:theChatImIn.value,
    }
    console.log (data)
    console.log (ChatsList.value[theChatImIn.value]);
    UserStore().socket.emit('Chat',data)
    ChatsList.value[theChatImIn.value].ChatArr.push(data);
    ChatText.value='';
}
const ShowNotificationHandler=async()=>{
    ShowNotification.value=!ShowNotification.value;
    for (let i=0;i<NotificationArr.value.length;i++){
        if (NotificationArr.value[i].status == 'Inactive'){
            const res = await OpenNotification(NotificationArr.value[i].NotificationId);
        }
    }
}
onBeforeMount(async()=>{
    loading.value= false;
    // console.log (UserStore().NotificationList)
    for (let i=0;i<UserStore().NotificationList.length;i++){
        const res = await Notification(UserStore().NotificationList[i])
        NotificationArr.value.push(res.data);
    }
    NotificationArr.value=NotificationArr.value.reverse();

    for (let i=0;i<UserStore().ChatList.length;i++){
        const res = await GetChat(UserStore().ChatList[i])
        ChatsList.value[UserStore().ChatList[i]]=res.data;
    }
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

const ClickHashtagHandler=(e)=>{
    // console.log (e.substr(1, e.length - 1));
    router.push(
    {name: 'Hashtag',
    params: {
        HashVal: e.substr(1, e.length - 1)
    }}).then(() => { router.go() })
}
const ShowCreateList = ref (false);
const CreatePost = ()=>{
    if (UserStore().AcademicStaff=='active'){
        ShowCreateList.value = !ShowCreateList.value;
    }else {
        router.push('/CreatePost')
    }
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
const showChatList =ref (props.open);
const OpenChatHandler = ()=>{
    showChatList.value = true;
}
const arr = ref ([]);
for (let i=0;i<30;i++){
    arr.value.push('#psut');
}
const theChatImIn= ref ();
const ShowChatPoop = (e,i)=>{
    if (chatSelected .value ==i){
        showChatBubbleList.value= !showChatBubbleList.value;
    }else showChatBubbleList.value = true;
    chatSelected.value = i
    theOneImChattingWith.value=arrChatNames.value[e];
    theChatImIn.value = e;
    console.log (theChatImIn.value);
}
const GetUserData = async (e)=>{
    const res = await GetChat(e);
    if (res.status==201){
        // console.log(res.data);
        const data = res.data;
        ChatsList.value[e]=data;
        let user;
        if (data.FirstUserId == UserStore().UserID)
            user = await GetUser(data.SecondUserId);
        else 
            user = await GetUser(data.FirstUserId);
        arrChatNames.value[e]=( user.data.Fname + " " + user.data.Lname);
        imgChatArr.value[e]=(`data:${user.data.Image.contentType};base64,${user.data.Image.image}`)
        loadingChatList.value= false;
    }
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
                                <template v-for="(e) in UserStore().CategoriesList" :key="e">
                                    <template v-if="e">
                                        <div 
                                        @click="ClickHashtagHandler(e)"
                                        class="btn btn-wide my-1 w-11/12 btn-success bg-main3 text-white">
                                        {{e}}
                                        </div>

                                    </template>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grow bg-black bg-opacity-20 h-screen" @click="showDrawer=false"></div>
            </div>
        </Transition>

        <Transition name="slide-fade-right">
            <div class="drawer-side fixed z-10 left-0 top-0 border-r-2 border-black w-screen" v-if="showChatList">
                <div class="grow bg-black bg-opacity-20 h-screen" @click="showChatList=false; emit('emitClose')"></div>
                <div class="flex flex-col h-screen justify-between bg-black bg-opacity-20">
                    <div @click="showChatBubbleList=false" class="grow bg-black bg-transparent"></div>
                    <Transition name="slide-fade-right">
                        <div class=" w-[30rem] h-[30rem] bg-white z-20 bg-white shadow-BoxBlackSm border-2 border-black m-5 mr-1 flex flex-col" v-if="showChatBubbleList">
                            <div class="flex border-b-2 border-black justify-between items-center">
                                <div class="flex items-end h-full">
                                    <div class="w-16 h-full bg-black border-r-2 border-black flex items-center justify-center">
                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"/></svg>
                                    </div>
                                    <div class="mb-1 relative flex flex-col">
                                        <h3 class="text-black text-[1.4rem] font-extrabold ml-4">
                                            {{ theOneImChattingWith }}
                                        </h3>
                                        <!-- <p class=" badge badge-sm ml-4 font-light text-Grey bg-main3 border-main3 text-white">ACTIVE</p> -->
                                    </div>
                                </div>
                                <div class="btn btn-ghost btn-circle mr-2" @click="showChatBubbleList=false">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                                </div>
                            </div>
                            <div class="grow my-2 overflow-y-auto mx-3 scroll-smooth overflow-x-hidden">
                                <template v-for="(e) in ChatsList[theChatImIn].ChatArr" :key="e.Id">
                                    <div class="chat chat-start" v-if="e.from != UserStore().UserID">
                                        <div class="chat-image avatar">
                                            <div class="w-12 rounded-full">
                                            <img :src="imgChatArr[theChatImIn]" />
                                            </div>
                                        </div>
                                        <div class="chat-header">
                                            <time class="text-xs opacity-50">{{formatTimeAgo(new Date(e.CreatedAt))}}</time>
                                        </div>
                                        <div class="chat-bubble chat-bubble-warning bg-main2">{{e.text}}</div>
                                    </div>
                                    <div class="chat chat-end" v-else>
                                        <div class="chat-header">
                                            <time class="text-xs opacity-50">{{formatTimeAgo(new Date(e.CreatedAt))}}</time>
                                        </div>
                                        <div class="chat-bubble chat-bubble-warning bg-main3">{{e.text}}</div>
                                    </div>
                                </template>
                            </div>
                            <div class="flex border-t-2 border-black items-center gap-3">
                                <textarea class="textarea textarea-bordered w-full h-1/2 ml-3 border-2 border-black" placeholder="Type something..." v-model="ChatText"></textarea>
                                <button class="btn btn-sm btn-success bg-main3 text-white mr-3" @click="SendChatHandler">send!</button>
                            </div>
                        </div>
                    </Transition>
                </div>
                <div class="flex mr-3">
                    <div class="h-screen p-4 w-80 bg-black bg-opacity-20 flex flex-col">
                        <div class="ContHash bg-white shadow-BoxBlackSm border-2 border-black p-4 m-1 h-full flex flex-col">
                            <h2 class="text-2xl font-extrabold mx-3 mt-2 border-b-2 pb-3 mb-3 border-black">My Chats</h2>
                            <div class=" text-base-content h-full overflow-y-auto text-center overflow-x-hidden">
                                <template v-for="(e,i) in UserStore().ChatList" :key="e">
                                    <template v-if="e">
                                        {{GetUserData(e)?'':'' }}
                                        <template v-if="loadingChatList">
                                        </template>
                                        <div v-else class="relative">
                                            <div 
                                            @click="ShowChatPoop(e,i)"
                                            class="normal-case gap-3 btn my-1 w-full border-2 border-black text-black hover:bg-black hover:text-white"
                                            :class="[chatSelected==i? 'bg-black text-white':'bg-white']"
                                            >
                                            <div class="avatar gap-2 items-center">
                                                <div class="w-7 rounded">
                                                    <img :src="imgChatArr[e]" />
                                                </div>
                                                Chat with
                                                {{ arrChatNames[e] }}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <div class="navbar-start">
            <div class="mr-9 relative">
                <a class="w-fit h-fit btn btn-ghost p-0" @click="router.push('/NewsFeed')"><OneDorm class="border-black border-2 w-20 h-20"></OneDorm></a>
                <p class="AcadmicText absolute academic text-lg font-extrabold right-[-0.4rem]" v-if="UserStore().AcademicStaff=='active'">ACADEMIC</p>
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
        <div class="navbar-end flex gap-3 relative">
            <div class="dropdown dropdown-end">
                <div class="btn btn-sm bg-black p-1 px-3 min-h-fit" @click="CreatePost">
                    <PlusIcon/>
                </div>
                <div v-if="ShowCreateList" class="absolute right-0 top-[2.3rem] border-2 border-black menu p-1 shadow bg-base-100 rounded-none w-20">
                    <li class="text-sm font-extrabold text-center btn btn-ghost btn-sm self-center w-full" @click="router.push('/CreatePost')">Post</li>
                    <li class="text-sm font-extrabold text-center btn btn-ghost btn-sm self-center w-full" @click="router.push('/CreatePost')">Blog</li>
                </div>
            </div>
            <div class="btn btn-ghost px-1 indicator" @click="OpenChatHandler">
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
                                    Replied to your 
                                    answer!
                                </template>
                                <template v-else>
                                    Answered your 
                                    question!
                                </template>
                                </h2>
                                <p class="font-light text-white text-xs self-end">{{ formatTimeAgo(new Date(e.CreatedAt)) }}</p>
                            </div>
                        </template>
                        <div v-if="NotificationArr.length==0" class="my-7 flex flex-col gap-5 items-center justify-center">
                            <p class=" text-lg">no notifications yet!</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="7em" viewBox="0 0 512 512"><path d="M352 493.4c-29.6 12-62.1 18.6-96 18.6s-66.4-6.6-96-18.6V288c0-8.8-7.2-16-16-16s-16 7.2-16 16V477.8C51.5 433.5 0 350.8 0 256C0 114.6 114.6 0 256 0S512 114.6 512 256c0 94.8-51.5 177.5-128 221.8V288c0-8.8-7.2-16-16-16s-16 7.2-16 16V493.4zM195.2 233.6c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2c17.6-23.5 52.8-23.5 70.4 0zm121.6 0c17.6-23.5 52.8-23.5 70.4 0c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2zM208 336v32c0 26.5 21.5 48 48 48s48-21.5 48-48V336c0-26.5-21.5-48-48-48s-48 21.5-48 48z"/></svg>
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
                    <p class="text-main2 text-center">{{UserStore().AnsList.length>99?'99+':UserStore().AnsList.length}}</p>
                </div>
                <div  tabindex="0" class="btn btn-cirle btn-ghost btn-sm self-center pr-1" @click="ClickHanlderShowList">
                    <Arrow_Bottom_White/>
                </div>
                <div v-if="ShowList" tabindex="0" class="mt-20 menu p-2 absolute shadow bg-black w-52 right-0" :class="[ShowList?'dropdown-open':'']">
                    <li class="text-white" @click="router.push('/profile')"><a>Profile</a></li>
                    <li class="text-white" @click="router.push('/MyPosts')"><a>My Posts</a></li>
                    <li class="text-Alert" @click="Logout"><a>Log out</a></li>
                </div>
                
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


.slide-fade-right-enter-active,
.slide-fade-right-leave-active {
    transition: all 0.3s ease-in-out;

}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(20px);
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
.AcadmicText{
    transition: all 0.3s ease-in-out;
    animation: anim 1s;
}

@keyframes anim {
    from {opacity: 0; transform: translateX(-20px);}
    to {opacity: 100;}
}
</style>