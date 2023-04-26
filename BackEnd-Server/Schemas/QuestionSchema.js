const mongoose = require('mongoose') ; 
const QuestionSchema = new mongoose.Schema({
    QuestionId: {type:String, unique:true, index: true},
    CreatedBy: {type:String, default:null},
    QuestionTitle: {type:String, default:null},
    QuestionType: {type:String, default:null},
    QuestionDetails: {type:String, default:null},
    QuestionUpvoteCount: {type:Number, default:0},
    QuestionDownVoteCount: {type:Number, default:0},
    ReportedCount: {type:Number, default:0},
    IsPinned: {type:Boolean, default:false},
    CreatedAt: {type: Date, default: Date.now()},
    LastEdit: {type:Date , default: Date.now()},
    Hashtags: [{
        Category:String
    }],
    Attachments: [{
        Attachment:String // check later
    }],
    AnswersList: [{
        Id: {type:String , default:null}
    }]
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;