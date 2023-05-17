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

                $cookies.set('Token',this.UserToken);
                console.log (this.UserID);
                console.log (res);
                return res;
            }else if (res.status == '409'){
                console.log ("res from store ",res);
                this.error = res.data;
                return res;
            }
        },
        async Login (data){
            console.log(data)
            const res = await POST('LogIn' , data);
            console.log(res)
            if(res.status=='200'){
                this.UserToken = res.Token;
                const Data = res.data.UserData;
                this .UserID = Data.UserId;
                this.Fname = Data.Fname;
                this.Lname = Data.Lname;
                this.Email = Data.Email;
                $cookies.set('Token',this.UserToken);
                return res;
            }
            else if(res.status == '400'){
                console.log("res from store " , res);
                this.error = res.data ;
                return res;
            }
        },
    }

})
export const QuestionStore = defineStore('Question' , {
    state: ()=>{
        return {
            QuestionId:null,
            CreatedBy:null,
            QuestionTitle:null,
            QestionType:null,
            QuestionDetails:null,
            QuestionUpvoteCount:0,
            QuestionDownvoteCount:0,
            ReportedCount:0,
            IsPinned:false,
            CreatedAt:null,
            LastEdit:null,
            error:null,
            Hashtags:null,
            Attachments:null,
            AnswersList:null
        }
    },
    getters: {
        GetQuestionData : (state) => {state.QuestionId,state.CreatedBy,state.QuestionTitle,state.QestionType,state.QuestionDetails}
    },
    actions:{
        async CreatePost(data){
            const res = await POST('CreatePost' , data);
            
        }
    }
})
