const mongoose = require('mongoose');
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