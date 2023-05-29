<script setup>
import { ref,onMounted } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import { UserStore } from '../stores/UserStore';
import ModalComponent from '../components/ModalComponent.vue';
import FormData from 'form-data';
import {UploadImage} from '../Helpers/APIs/UserAPIs'
import {CreateRequest} from '../Helpers/APIs/RequestAPIs'
import Alert from '../components/Alert.vue';

const isEdit = ref (true);
const Fname = ref (UserStore().Fname);
const Lname = ref (UserStore().Lname);
const Uni = ref();
const Major = ref();
if (UserStore().UserDetails){
    Uni.value = ref(UserStore().UserDetails.University);
    Major.value = ref(UserStore().UserDetails.Major);
}
const username = ref (UserStore().Username);
const email = ref (UserStore().Email);
const ShowModal = ref (false);
const phone = ref ();
const Address = ref ();
const city = ref ();
const Country = ref ();
const DateOfBirth= ref();
const closeModal = ()=>{
    ShowModal.value = false;
}
const imageHandler = async (e)=>{
    let fd = new FormData();
    fd.append("UserId",UserStore().UserID);
    fd.append("Image",e.target.files[0]);
    console.log ('3aw',fd)
    await UploadImage(fd);
    await UserStore().GetUser(UserStore().UserID);
};
const OldPassword = ref ();
const Password = ref ();
const Password2 = ref();
const ChangePassword = () =>{
    console.log (Password.value + " " + Password2.value);
}
const errorAcademicModal = ref ();
const MessageValueForAcademic= ref ('');
const SendRequestAcademic = async () =>{
    errorAcademicModal.value='';
    if (MessageValueForAcademic.value==''){
        errorAcademicModal.value= "Please Insert the message!";
        return ;
    }
    const data = {
        UserId:UserStore().UserID,
        RequestMessage:MessageValueForAcademic.value
    }
    console.log (data);
    const res = await CreateRequest(data);
    console.log ("res",res);
    if (res.status ==201){
        UserStore().AcademicStaff='pending';
    }
    console.log (UserStore().AcademicStaff);
    ShowAcademicModal.value= false;
}
const ShowAcademicModal = ref (false);
</script>
<template>
    <main>
        <ModalComponent 
        @emit-close="closeModal" 
        :class="[ShowModal? 'modal-open' : '']" 
        @Func1="ChangePassword" 
        ModalContent="Please change your password by writing your old one then the new one! Yes as simple as that!" 
        ModalContentHeader="Change your Password:" Btn1Cont="Change!" 
        :with-btn1="true">
        <template #content>
            <div class="flex flex-col gap-2 my-3">
                <div class="flex gap-10 justify-start">
                    <div class="form-control w-1/2">
                        <label class="label">
                            <span class="label-text text-lg font-bold">Your Old Password:</span>
                        </label>
                        <input v-model="OldPassword" type="text" placeholder="Old Password" class="input input-bordered w-full" />
                    </div>
                </div>
                <div class="flex gap-10 justify-start">
                    <div class="form-control w-1/2">
                        <label class="label">
                            <span class="label-text text-lg font-bold">Your New Password:</span>
                        </label>
                        <input v-model="Password" type="text" placeholder="New Password" class="input input-bordered w-full" />
                    </div>
                    <div class="form-control w-1/2">
                        <label class="label">
                            <span class="label-text text-lg font-bold">Repeat it:</span>
                        </label>
                        <input v-model="Password2" type="text" placeholder="Repeat" class="input input-bordered w-full" />
                    </div>
                </div>
                <div class="w-full">
                    <a class="text-Alert">Forget password?</a>
                </div>
            </div>
        </template>
        </ModalComponent>

        <ModalComponent 
        @emit-close="ShowAcademicModal=false" 
        :ModalContent = "UserStore().AcademicStaff == 'inactive'?'Please note that an admin would read your request and evaluate it by contacting you via email then give you the role.':''"
        ModalContentHeader="Request Academic Staff role"  
        :class="[ShowAcademicModal? 'modal-open' : '']" 
        @Func1="SendRequestAcademic"  Btn1Cont="Send Request" 
        :with-btn1="UserStore().AcademicStaff == 'inactive' || UserStore().AcademicStaff == 'denied'">
            <template #content>
                <div v-if="UserStore().AcademicStaff == 'inactive' || UserStore().AcademicStaff == 'denied'" class="flex flex-col gap-2 my-3">
                    <div v-if="UserStore().AcademicStaff == 'denied'" class="mb-4">
                        <h2  class="text-2xl font-base">Your Request status is 
                            <span class="text-Alert font-extrabold">
                                Denied.
                            </span>
                        </h2>
                        <h2 class="text-base font-base">
                            Feel free to submit another request.
                        </h2>

                    </div>
                    <textarea v-model="MessageValueForAcademic" class="textarea textarea-bordered" placeholder="Why do you think we should give you the role"></textarea>
                    <Alert classProp="alert-warning"  v-if="errorAcademicModal"><template #Error_Message>{{ errorAcademicModal }}</template></Alert>
                </div>
                <div v-else-if="UserStore().AcademicStaff == 'pending'" class="flex flex-col gap-2 my-3">
                    <h2 class="text-2xl font-base">Your Request status is still 
                        <span class="text-main1 font-extrabold">
                            pending.
                        </span>
                    </h2>
                    <h2 class="text-base font-base">
                        Please wait till one of our admins to approve or deny.
                    </h2>
                </div>
                <div v-else class="flex flex-col gap-2 my-3">
                    <h2 class="text-2xl font-base">
                        You are already an 
                        <span class="text-main3 font-extrabold">
                            Academic Staff!
                        </span>
                    </h2>
                    <h2 class="text-base font-base">
                        Enjoy the perks!
                    </h2>
                </div>
            </template>
        </ModalComponent>
        <HeaderComponent></HeaderComponent>
        <div class="w-5/6 h-full mx-auto">
            <div class="flex gap-6">
                <div class="w-1/4 h-1/3">
                    <div class="avatar mb-7">
                        <div class="w-full h-auto border-2 transition-all duration-150 ease-in-out border-black shadow-main3 shadow-BoxBlackSm hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                            <img :src='UserStore().image' />
                        </div>

                    </div>
                    <input hidden id="Image" type="file" name="Image" @change="imageHandler" accept="image/*" />
                    <label for="Image" class="focus:none btn btn-success bg-main3 shadow-main2 border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">Edit Profile Pecture</label>
                    <button @click="isEdit = !isEdit" class="mt-5 focus:none btn btn-error bg-Alert shadow-Alert border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">Edit Profile Details</button>
                    <button @click="ShowModal= true" class="mt-5 focus:none btn btn-warning bg-main1 shadow-main1 border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">Change Password</button>

                </div>
                <div class="grow flex flex-col gap-10">
                    <div class="grow p-5 bg-Grey2 shadow-BoxBlackSm shadow-Grey border-2 border-black hover:translate-x-[0.45rem] transition-all duration-150 ease-in-out hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                        <h1 class="text-4xl font-[1000] mb-4">Personal Details </h1>
                        <div class="flex flex-col gap-5 relative">
                            <div class="flex gap-10 justify-center">
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Your First name:</span>
                                    </label>
                                    <input type="text" v-model="Fname" placeholder="First Name" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                                <div class="form-control w-full">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Your Last name:</span>
                                    </label>
                                    <input type="text" v-model="Lname" placeholder="Last Name" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                            </div>
                            <div class="flex gap-10 justify-center">
                                <div class="form-control w-2/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Your university:</span>
                                    </label>
                                    <input type="text" v-model="Uni" placeholder="Princess Sumayah University for Technology" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                                <div class="form-control w-1/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Your Major:</span>
                                    </label>
                                    <input type="text" v-model="Major" placeholder="Computer Science" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                            </div>
                            <div class="flex gap-10 justify-center">
                                <div class="form-control w-1/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Your birth date:</span>
                                    </label>
                                    <input type="date" v-model="DateOfBirth" placeholder="Type here" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                                <div class="form-control w-1/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Country:</span>
                                    </label>
                                    <input type="text" v-model="Country" placeholder="Jordan" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                                <div class="form-control w-1/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">City:</span>
                                    </label>
                                    <input type="text" v-model="city" placeholder="Amman" class="input input-bordered w-full" :disabled="isEdit" />
                                </div>
                                
                            </div>
                            <div class="flex gap-10 justify-center pb-4">
                                <div class="form-control w-1/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Your Phone Number?</span>
                                    </label>
                                    <input type="text" v-model="phone" placeholder="+(962) 000000000" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                                <div class="form-control w-2/3">
                                    <label class="label">
                                        <span class="label-text text-lg font-bold">Address:</span>
                                    </label>
                                    <input type="text" v-model="Address" placeholder="Type here" class="input input-bordered w-full"  :disabled="isEdit"/>
                                </div>
                            </div>
                            <div class="flex justify-center" v-if="!isEdit">

                                <button @click="isEdit = !isEdit" class="mt-5 focus:none btn btn-error bg-Alert shadow-Alert border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">Done?</button>
                            </div>

                        </div>
                    </div>
                    <div class="mb-10 grow flex flex-col gap-5 p-5 bg-Grey2 shadow-BoxBlackSm shadow-Grey border-2 border-black hover:translate-x-[0.45rem] transition-all duration-150 ease-in-out hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">
                        <h1 class="text-4xl font-[1000] ">User Details</h1>
                        <div class="flex gap-10 justify-center">
                            <div class="form-control w-1/2">
                                <label class="label">
                                    <span class="label-text text-lg font-bold">Your Email:</span>
                                </label>
                                <input type="text" v-model="email" placeholder="wtv.email.com" disabled class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-1/2">
                                <label class="label">
                                    <span class="label-text text-lg font-bold">Your Username:</span>
                                </label>
                                <input type="text" v-model="username" placeholder="MeowXXX69" disabled class="input input-bordered w-full" />
                            </div>
                        </div>
                        <div class="flex mt-5 gap-10 justify-center">
                            <div class="form-control w-1/3">
                                <button @click="ShowAcademicModal = true" class="focus:none btn btn-success bg-main3 border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">Request Academic Staff Role</button>
                            </div>
                            <div class="form-control w-1/3">
                                <button class="focus:none btn btn-error bg-Alert border-black border-2 shadow-BoxBlackSm text-white rounded-none hover:translate-x-[0.45rem] hover:translate-y-[0.45rem] top-[-0.5rem] left-[-0.5rem] hover:shadow-none">Delete Account :c</button>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
        
    </main>
</template>