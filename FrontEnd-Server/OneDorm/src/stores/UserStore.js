import { defineStore } from 'pinia'
import {GET,POST} from '../../Helpers/APIs'
import VueCookies from 'vue-cookies'
import { io } from "socket.io-client";


export const UserStore = defineStore('User',{
    state: ()=>{
        return {
            UserID:'-1',
            Fname:'Anton',
            Lname:'Bahou',
            Username:null,
            Email:null,
            Phonenumber:null,
            NotificationList:null,
            PostList:null,
            ChatList:null,
            CategoriesList:null,
            UserToken:null,
            error:null,
            image:'https://i.pravatar.cc/300',
            UserDetails:{},
            UserVotes:{},
            AcademicStaff:'inactive',
            socket:null,
        }
    },
    getters: {
        GetUserData : (state) => {state.UserID,state.Fname,state.Lname,state.Username,state.UserToken}
    },
    actions:{
        async SignUp (data) {
            const res = await POST ('SignUp' ,data);
            if (res.status=='201'){
                const Data = res.data;
                console.log (Data);
                this.UserID = Data.UserId;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.AcademicStaff = Data.VerificationState?Data.VerificationState:'inactive';
                // this.UserVotes = Data.UserVotes;
                this.UserToken = Data.token;
                // this.Username = Data.Username;
                // this.UserDetails= Data.UserDetails
                window.$cookies.set('Token',this.UserToken);
                return res;
            }else if (res.status == '409'){
                this.error = res.data;
                return res;
            }
        },
        async Login (data){
            const res = await POST('LogIn' , data);
            if(res.status=='200'){
                this.UserToken = res.data.Token;
                const Data = res.data.UserData;
                this .UserID = Data.UserId;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserVotes = Data.UserVotes;
                this.UserDetails= Data.UserDetails;
                this.AcademicStaff = Data.VerificationState?Data.VerificationState:'inactive';
                this.Username = Data.Username;
                if (Data.Image){
                    console.log (Data.Image);
                    this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                }else {
                    this.image ='https://lh3.googleusercontent.com/Dq9gy_sLK2FmQ-vmMOQQGPfAMv5sSeyrwb1UcvR2urDFrPVTkbfCWtovJZjuI-yumftkgH_vgBXPIx06cmVIVNFlnbLLoy6cmip4B8X6t7Zf_RgNdtZXAD-VLguppLve70PDLHob3qHHf_kWme51kJ0-OiLO2Z7r74BHRXy87YNvHRXUCPMdcRXFbcJEQ__W74BYmqWn7sjHDS8MYt8k_LrZigHUc67yTsLXDAWndnkPb8kEwYc0586uW3_780brtk1hxkDD0pOhvAc1duE2qeuNvl7rIpub02yc0qcoa1PjN80Xo5bS3ryIrOuaT6GGsCUA7jneiC0xuaSqVnc63SHANR9feT_bZ2p6oMfhjIlVWGqqyxidq6p0Yph360b41Nl5wuMT2snmNrFDZdVYMFNstqfbnAbroT7Fk9xXY_Lp_H7qyL6YlhQo71WGfmInOtciH8ueg3pJJ06VjYySpnNjImH4zyL3X0E9VOVZ6R7yzs8OCLB99Kdqac1cr5Noa8cT1NzEawandu2BL9f0qXnGaZdhI5M_1PRGLasXrRFOEmet9lncKfDG5aZ3Eqo27eyViYetsT8jhs1yOyAI8X8yBgNg7xd-olVsaOk0573RzzvOYTXBAzNU65PdMWuhgfgAeu4wJ8eqT-QFUkREviSpr-3kn0LZEGKou6hJEUVuLLf3CVC3Vg-ZigOcWfNCNBpojMvAk19Ct5EgUe2MUDy0YSDCqbxXTadLp8drYqw_gYCi1Leoo-fibfk80zYcqDU8I_OwG6a8P0OBjBjfgaNaux-b2wUX3npiwXz4FRTKjQzt7wZSaIpgdlpyB3lDPS0kWurvQu4oX6KefKYvEAw-QM5D2VJ37Lq3RrcgtpgOuqCRIGIuI__Hm9SnG3HC8ysZRErpYZfhN3P6r1LjMYXixxHbLy-tUofB4wzx6m_2XhfmZTwe_6nkMml_qjp5aIN1t0xCteR5BDRK3xZkl_wVSfEsDc1tBs0svefPEdGaKDKLUtVCYyTOGEqC9UshrS-3LA2stGb38P7_GxRuSDhTwa0=w1080-h1080-s-no?authuser=0'
                }
                window.$cookies.set('Token',res.data.Token);
                return res;
            }
            else if(res.status == '400'){
                this.error = res.data ;
                return res;
            }
        },
        async GetUser(Id){
            const res = await GET('GetUser/'+Id);
            this.socket = io('ws://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
            this.socket.emit('join',Id);
            console.log(this.socket);
            if(res.status=='201'){
                const Data = res.data;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserDetails= Data.UserDetails
                this.Username = Data.Username;
                this.UserVotes = Data.UserVotes;
                this.AcademicStaff = Data.VerificationState?Data.VerificationState:'inactive';
                if (Data.Image){
                    console.log (Data.Image);
                    this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                }else {
                    this.image ='https://lh3.googleusercontent.com/Dq9gy_sLK2FmQ-vmMOQQGPfAMv5sSeyrwb1UcvR2urDFrPVTkbfCWtovJZjuI-yumftkgH_vgBXPIx06cmVIVNFlnbLLoy6cmip4B8X6t7Zf_RgNdtZXAD-VLguppLve70PDLHob3qHHf_kWme51kJ0-OiLO2Z7r74BHRXy87YNvHRXUCPMdcRXFbcJEQ__W74BYmqWn7sjHDS8MYt8k_LrZigHUc67yTsLXDAWndnkPb8kEwYc0586uW3_780brtk1hxkDD0pOhvAc1duE2qeuNvl7rIpub02yc0qcoa1PjN80Xo5bS3ryIrOuaT6GGsCUA7jneiC0xuaSqVnc63SHANR9feT_bZ2p6oMfhjIlVWGqqyxidq6p0Yph360b41Nl5wuMT2snmNrFDZdVYMFNstqfbnAbroT7Fk9xXY_Lp_H7qyL6YlhQo71WGfmInOtciH8ueg3pJJ06VjYySpnNjImH4zyL3X0E9VOVZ6R7yzs8OCLB99Kdqac1cr5Noa8cT1NzEawandu2BL9f0qXnGaZdhI5M_1PRGLasXrRFOEmet9lncKfDG5aZ3Eqo27eyViYetsT8jhs1yOyAI8X8yBgNg7xd-olVsaOk0573RzzvOYTXBAzNU65PdMWuhgfgAeu4wJ8eqT-QFUkREviSpr-3kn0LZEGKou6hJEUVuLLf3CVC3Vg-ZigOcWfNCNBpojMvAk19Ct5EgUe2MUDy0YSDCqbxXTadLp8drYqw_gYCi1Leoo-fibfk80zYcqDU8I_OwG6a8P0OBjBjfgaNaux-b2wUX3npiwXz4FRTKjQzt7wZSaIpgdlpyB3lDPS0kWurvQu4oX6KefKYvEAw-QM5D2VJ37Lq3RrcgtpgOuqCRIGIuI__Hm9SnG3HC8ysZRErpYZfhN3P6r1LjMYXixxHbLy-tUofB4wzx6m_2XhfmZTwe_6nkMml_qjp5aIN1t0xCteR5BDRK3xZkl_wVSfEsDc1tBs0svefPEdGaKDKLUtVCYyTOGEqC9UshrS-3LA2stGb38P7_GxRuSDhTwa0=w1080-h1080-s-no?authuser=0'
                }
                return res;
            }
            else if(res.status == '400'){
                this.error = res.data ;
                return res;
            }
        }
    }

})