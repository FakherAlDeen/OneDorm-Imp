const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Question = require('../Schemas/QuestionSchema');
module.exports = {
    CreateQuestion: (Data)=>{
        const newRecord = new Question (Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditQuestion: async function (Id,Data){
        await Question.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteQuestion: async function (Id){
        await Question.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneQuestionRecord: async function (Data, Selection=""){
        const query = await Question.find(Data).select(Selection);
        return query;
    }

};