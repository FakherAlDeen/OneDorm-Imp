import { defineStore } from 'pinia'
import {GET,POST} from '../../Helpers/APIs'
export const UserStore = defineStore('User',{
    state: ()=>{
        return {
            UserID:null,
            Fname:null,
            Lname:null,
            Username:null,
            Email:null,
            Phonenumber:null,
            NotificationList:null,
            PostList:null,
            ChatList:null,
            CategoriesList:null,
            UserToken:null,
            error:null,
        }
    },
    getters: {
        Page: (state) => state.PageIamIn,
        GetUserData : (state) => {state.UserID,state.Fname,state.Lname,state.Username,state.UserToken}

    },
    actions:{
        async SignUp (data) {
            console.log (data)
            const res = await POST ('SignUp' ,data);
            if (res.status=='201'){
                const Data = res.data;
                this.UserID = Data.UserID;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserToken = Data.token;
                console.log (res);
            }else {
                console.log ("res from store ",res);
                this.error = res.data;
            }
        },
    }

})
