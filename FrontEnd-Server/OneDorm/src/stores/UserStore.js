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
                this.UserID = Data.UserId;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserVotes = Data.UserVotes;
                this.UserToken = Data.token;
                this.Username = Data.Username;
                this.UserDetails= Data.UserDetails
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
                this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
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
                this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                return res;
            }
            else if(res.status == '400'){
                this.error = res.data ;
                return res;
            }
        }
    }

})