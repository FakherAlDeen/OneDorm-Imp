import { defineStore } from 'pinia'
import {GET,POST} from '../../Helpers/APIs'
import VueCookies from 'vue-cookies'

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
                this.UserDetails= Data.UserDetails
                this.Username = Data.Username;
                if (Data.Image){
                    console.log (Data.Image);
                    this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                }else {
                    this.image ='https://lh3.googleusercontent.com/DOtCpyyzJbEhqw1KV93aAvKFevJCmn-6oSQ-55XdSL3kZak9qubt0reC1r7wnd0zMS82oSTd8E01k918qxPkrji2ouMDWraIbRMGSx9RvbIraXtWh1kHVhvJyM9HdYY7bHpZpqADSd9BDO4KOwbgXhjHYeRw-ThmfzpZSAoQep7xTJz-iGIWlW0GZeyPFTAb3VFuaNmuQZBitZRvt-kql1vJpFfZvbk_T2lkGWw44ghGKWRmIQ__omWtqgyTSdDD59bsQIQHRZTn-E-Pv030Gs6Y-XD6py0UDTi4sr5i2Sj1R2dCbb29AH3nBv-3k0V6iNT45MszvWorm5mYZZMJo7wx4lmMrf06LQfQikcQGza0HvLEXOMPiK3rrft9dxyOhHCWbcJzBqKmBzMGS3057RKRfBbmc_S4Z5x6Bfs8Pygjg4i3lxhzcaKsf4uHFF-HcOGw2J-KRUW1oyadNuaycQLDq3njfgo8_GjwzKUIj4OAZfrM5u2cPbd7Kw6GbikC5zjzSX-hCnGyz4cnZ-6QtNHpt32tTMoTYhlwJ1Ue-VJp9pHt4rueVVYDhdBQMqnEMqbGFBPZY5nmwlM2icTDaEMZCb0UGBtJAO1TZZgFcE0NVxWiuX358PjmzE_e-z1NRg_uMC8k5pVYSCqBfY8illX6kekQv8OTsMEvN7diJxr8xjrWUrNL8otnyAs0h0py3r9A7B9zD8UiL_RNSAIxDYdR1LJR6WAQNhiLbGrqsjrhkfu3me-PHxMtTPUapMDUF1wJIduSDiGZngj33HeLKLYvVjFPhzagETncLxqI3KsGkIhf54YovHiWcbiyQDUAEpQtF8U6oDfKzrnDFHRYboVDayI-NcYf4HTFgY1jKDXT23DlZ3x-uSvHrn0sEodVMFgBZ7-KTvvyn6hcS_DQMXiWbXKYtb8GLlOzOFSAauuPiLCrE8pMC2yH1mpwV9fRR4f81slt_10b3UvIV6f3P0fq1UDoe5Bo9brTt35IlrKTNGnhqy_IxkqkyYZL0JfZ5vK8i0ceErqWKf90eFcuT3Y9AJw=w961-h961-s-no?authuser=0'
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
            if(res.status=='201'){
                const Data = res.data;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserDetails= Data.UserDetails
                this.Username = Data.Username;
                this.UserVotes = Data.UserVotes;
                if (Data.Image){
                    console.log (Data.Image);
                    this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                }else {
                    this.image ='https://lh3.googleusercontent.com/DOtCpyyzJbEhqw1KV93aAvKFevJCmn-6oSQ-55XdSL3kZak9qubt0reC1r7wnd0zMS82oSTd8E01k918qxPkrji2ouMDWraIbRMGSx9RvbIraXtWh1kHVhvJyM9HdYY7bHpZpqADSd9BDO4KOwbgXhjHYeRw-ThmfzpZSAoQep7xTJz-iGIWlW0GZeyPFTAb3VFuaNmuQZBitZRvt-kql1vJpFfZvbk_T2lkGWw44ghGKWRmIQ__omWtqgyTSdDD59bsQIQHRZTn-E-Pv030Gs6Y-XD6py0UDTi4sr5i2Sj1R2dCbb29AH3nBv-3k0V6iNT45MszvWorm5mYZZMJo7wx4lmMrf06LQfQikcQGza0HvLEXOMPiK3rrft9dxyOhHCWbcJzBqKmBzMGS3057RKRfBbmc_S4Z5x6Bfs8Pygjg4i3lxhzcaKsf4uHFF-HcOGw2J-KRUW1oyadNuaycQLDq3njfgo8_GjwzKUIj4OAZfrM5u2cPbd7Kw6GbikC5zjzSX-hCnGyz4cnZ-6QtNHpt32tTMoTYhlwJ1Ue-VJp9pHt4rueVVYDhdBQMqnEMqbGFBPZY5nmwlM2icTDaEMZCb0UGBtJAO1TZZgFcE0NVxWiuX358PjmzE_e-z1NRg_uMC8k5pVYSCqBfY8illX6kekQv8OTsMEvN7diJxr8xjrWUrNL8otnyAs0h0py3r9A7B9zD8UiL_RNSAIxDYdR1LJR6WAQNhiLbGrqsjrhkfu3me-PHxMtTPUapMDUF1wJIduSDiGZngj33HeLKLYvVjFPhzagETncLxqI3KsGkIhf54YovHiWcbiyQDUAEpQtF8U6oDfKzrnDFHRYboVDayI-NcYf4HTFgY1jKDXT23DlZ3x-uSvHrn0sEodVMFgBZ7-KTvvyn6hcS_DQMXiWbXKYtb8GLlOzOFSAauuPiLCrE8pMC2yH1mpwV9fRR4f81slt_10b3UvIV6f3P0fq1UDoe5Bo9brTt35IlrKTNGnhqy_IxkqkyYZL0JfZ5vK8i0ceErqWKf90eFcuT3Y9AJw=w961-h961-s-no?authuser=0'
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