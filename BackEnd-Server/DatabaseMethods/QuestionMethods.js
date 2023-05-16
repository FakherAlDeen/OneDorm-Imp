const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Question = require('../Schemas/QuestionSchema');
module.exports = {
    CreateQuestion: async function (Data){
        const newRecord = new Question (Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditQuestion: async function (QuestionId,Data){
        await Question.findOneAndUpdate(
            {QuestionId},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteQuestion: async function (QuestionId){
        await Question.deleteOne(
            {QuestionId}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneQuestionRecord: async function (Data, Selection=""){
        const query = await Question.find(Data).select(Selection);
        return query;
    }

};