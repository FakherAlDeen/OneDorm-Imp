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
        }
    },
    getters: {
        GetUserData : (state) => {state.UserID,state.Fname,state.Lname,state.Username,state.UserToken}
    },
    actions:{
        async SignUp (data) {
            console.log (data)
            const res = await POST ('SignUp' ,data);
            if (res.status=='201'){
                const Data = res.data;
                this.UserID = Data.UserId;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserToken = Data.token;
                window.$cookies.set('Token',this.UserToken);
                return res;
            }else if (res.status == '409'){
                console.log ("res from store ",res);
                this.error = res.data;
                return res;
            }
        },
        async Login (data){
            // const $cookies = inject('$cookies');
            console.log(data)
            const res = await POST('LogIn' , data);
            console.log(res)
            if(res.status=='200'){
                this.UserToken = res.data.Token;
                const Data = res.data.UserData;
                this .UserID = Data.UserId;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                // console.log (res);
                window.$cookies.set('Token',res.data.Token);
                // console.log (window.$cookies.get("Token"));
                return res;
            }
            else if(res.status == '400'){
                console.log("res from store " , res);
                this.error = res.data ;
                return res;
            }
        },
        async GetUser(Id){
            const res = await GET('GetUser/'+Id);
            console.log (res);
            if(res.status=='201'){
                const Data = res.data;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                return res;
            }
            else if(res.status == '400'){
                console.log("res from store " , res);
                this.error = res.data ;
                return res;
            }
        }
    }

})