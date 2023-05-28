const mongoose = require('mongoose') ; 
const AnswerSchema = new mongoose.Schema({
    AnswerId: {type:String, unique:true, index: true},
    ParentId: {type:String},
    CreatedBy: {type:String, default:null},
    AnswerDetails: {type:Object, default:null},
    AnswerDetailsHTML: {type:String, default:null},
    AnswerVotesCount: {type:Number , default:0},
    ReportedCount: {type:Number, default:0},
    IsPinned: {type:Boolean, default:false},
    CreatedAt: {type: Date, default: Date.now()},
    LastEdit: {type:Date},
    Attachments: [{
        Attachment:String
    }],
    AnswersList: []
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;