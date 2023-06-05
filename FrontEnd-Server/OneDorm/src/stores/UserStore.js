import { defineStore } from 'pinia'
import {GET,POST} from '../../Helpers/APIs'
import VueCookies from 'vue-cookies'
import { io } from "socket.io-client";

const socketAdr = 'ws://localhost:3001';

export const UserStore = defineStore('User',{
    state: ()=>{
        return {
            UserID:'-1',
            Fname:'Anton',
            Lname:'Bahou',
            Username:null,
            Email:null,
            Phonenumber:null,
            NotificationList:[],
            PostList:null,
            ChatList:[],
            CategoriesList:[],
            UserToken:null,
            error:null,
            image:'https://i.pravatar.cc/300',
            UserDetails:{
                University:'',
                Major:'',
                Country:'',
                City:'',
                Address:''
            },
            AnsList:[],
            UserVotes:{},
            AcademicStaff:'inactive',
            socket:null,
            DateOfBirth:null,
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
                this.NotificationList = Data.NotificationList;
                this.AcademicStaff = Data.VerificationState?Data.VerificationState:'inactive';
                this.CategoriesList = Data.CategoriesList;
                this.AnsList = Data.AnswersList
                this.ChatList = Data.ChatList
                // this.UserVotes = Data.UserVotes;
                this.UserToken = Data.token;
                // this.Username = Data.Username;
                // this.UserDetails= Data.UserDetails
                this.socket = io(socketAdr, { transports: ['websocket', 'polling', 'flashsocket'] });
                this.socket.emit('join',this.UserID);
                window.$cookies.set('Token',this.UserToken);
                this.GetUser(Data.UserId)
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
                this.NotificationList = Data.NotificationList;
                this.CategoriesList=Data.CategoriesList
                this.ChatList = Data.ChatList;
                this.AcademicStaff = Data.VerificationState?Data.VerificationState:'inactive';
                this.AnsList = Data.AnswersList
                this.Username = Data.Username;
                this.socket = io(socketAdr, { transports: ['websocket', 'polling', 'flashsocket'] });
                this.socket.emit('join',this.UserID);
                if (Data.Image){
                    console.log (Data.Image);
                    this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                }else {
                    this.image ='https://i.ibb.co/g39WZXc/User-1.png'
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
            this.socket = io(socketAdr, { transports: ['websocket', 'polling', 'flashsocket'] });
            this.socket.emit('join',Id);
            if(res.status=='201'){
                const Data = res.data;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                this.UserDetails= Data.UserDetails
                this.Username = Data.Username;
                this.UserVotes = Data.UserVotes;
                this.DateOfBirth = Data.DateOfBirth;
                this.Phonenumber = Data.Phonenumber;
                this.ChatList = Data.ChatList;
                this.NotificationList = Data.NotificationList;
                this.AnsList = Data.AnswersList
                this.CategoriesList= Data.CategoriesList;
                this.AcademicStaff = Data.VerificationState?Data.VerificationState:'inactive';
                if (Data.Image){
                    // console.log (Data.Image);
                    this.image =`data:${Data.Image.contentType};base64,${Data.Image.image}`
                }else {
                    this.image ='https://i.ibb.co/g39WZXc/User-1.png'
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