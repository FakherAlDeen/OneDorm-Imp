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
            }else if (res.status == '409'){
                console.log ("res from store ",res);
                this.error = res.data;
            }
        },
        async Login (data){
            console.log(data)
            const res = await POST('LogIn' , data);
            console.log(res)
            if(res.status=='200'){
                const Data = res.data;
                this.Email = Data.Email;
            }
            else if(res.status == '400'){
                console.log("res from store " , res);
                this.error = res.data ;
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
