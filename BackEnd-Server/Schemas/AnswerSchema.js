const mongoose = require('mongoose') ; 
const AnswerSchema = new mongoose.Schema({
    AnswerId: {type:String, unique:true, index: true},
    CreatedBy: {type:String, default:null},
    AnswerDetails: {type:String, default:null},
    AnswerDetailsHTML: {type:String, default:null},
    AnswerUpvoteCount: {type:Number, default:0},
    AnswerDownVoteCount: {type:Number, default:0},
    ReportedCount: {type:Number, default:0},
    IsPinned: {type:Boolean, default:false},
    CreatedAt: {type: Date, default: Date.now()},
    LastEdit: {type:Date},
    Attachments: [{
        Attachment:String // check later
    }],
    AnswersList: []
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;