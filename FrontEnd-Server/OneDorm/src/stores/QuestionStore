import { defineStore } from 'pinia'
import {GET,POST} from '../../Helpers/APIs'
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