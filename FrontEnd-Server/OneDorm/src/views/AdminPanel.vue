<script setup>
import OneDorm from '../assets/icons/OneDorm.vue';
import {onBeforeMount,ref} from 'vue'
import {GetRequests,ApproveRequest,DenyRequest} from '../Helpers/APIs/RequestAPIs'
import { GetUser } from '../Helpers/APIs/UserAPIs';
const Loading = ref(true);
const Requests = ref ([]);
const Approve = async (e)=>{
    const res = await ApproveRequest ({RequestId:e});
    console.log (res);
    if (res.status ==201){
        Requests.value = Requests.value.filter (i=>i.RequestId != e);
    }
}
const Deny = async (e)=>{
    const res = await DenyRequest ({RequestId:e});
    console.log (res);
    if (res.status ==201){
        Requests.value = Requests.value.filter (i=>i.RequestId != e);
    }
}
onBeforeMount(async ()=>{
    Loading.value = false;
    const res = await GetRequests();
    Requests.value = res.data;
    for (let i=0;i<Requests.value.length;i++){
        const User = await GetUser(Requests.value[i].RequesterId);
        const UserData = User.data;
        console.log (UserData);
        Requests.value[i]['Name']=UserData.Fname + " " +UserData.Lname;
        Requests.value[i]['Email']=UserData.Email;
    }
    console.log (Requests.value);
})

</script>
<template>
    <main>
        <div class="flex items-center gap-7 m-6">
            <OneDorm class="border-black border-2 w-20 h-20"/>
            <h1 class="text-4xl"><span class="font-extrabold">
                Admin
            </span> Panel</h1>
        </div>
        <template v-if="Loading">
            <div class="flex">
                <button class="m-auto btn btn-square loading"></button>
            </div>
        </template>
        <div v-else class="m-6 my-20 flex flex-col gap-10">
            <h1 class="text-4xl font-extrabold">
            Academic Staff Requests:</h1>
            <div class="overflow-x-auto bg-main1 p-10 card">
                <table class="table w-full">
                    <!-- head -->
                    <thead>
                    <tr>
                        <th></th>
                        <th>Request ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(e,i) in Requests" :key="e.RequestId">
                        <tr>
                            <th>{{i+1}}</th>
                            <td>{{e.RequestId}}</td>
                            <td>{{e.Name}}</td>
                            <td>{{e.Email}}</td>
                            <td>{{e.RequestMessage}}</td>
                            <td class="flex gap-4">
                                <button class="btn btn-sm btn-success text-white bg-main3" @click="Approve(e.RequestId)">approve</button> 
                                <button @click="Deny(e.RequestId)" class="bg-Alert btn btn-sm btn-error text-white">Deny</button>
                            </td>
                        </tr>

                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- <b>OneDormCTF{AH_DAMN_WE_SCREWED_UP}</b> -->
    </main>
</template>