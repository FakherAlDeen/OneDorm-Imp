const mongoose = require('mongoose') ; 
const QuestionSchema = new mongoose.Schema({
    QuestionId: {type:String, unique:true, index: true},
    CreatedBy: {type:String, default:null},
    QuestionTitle: {type:String, default:null},
    QuestionType: {type:String, default:null},
    QuestionDetails: {type:Object, default:null},
    QuestionDetailsHTML: {type:String , default:null},
    QuestionVotesCount: {type:Number , default:0},
    // QuestionUpvoteCount: {type:Number, default:0},
    // QuestionDownVoteCount: {type:Number, default:0},
    ReportedCount: {type:Number, default:0},
    AnswerCount: {type:Number , default:1},
    CreatedAt: {type: Date, default: Date.now()},
    LastEdit: {type:Date , default: Date.now()},
    Hashtags: [],
    Attachments: [{
        Attachment:String // check later
    }],
    AnswersList: []
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;