const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Answer = require('../Schemas/AnswerSchema');
module.exports = {
    CreateAnswer: (Data)=>{
        const newRecord = new Answer(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditAnswer: async function (Id,Data){
        await Answer.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteAnswer: async function (Id){
        await Answer.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneAnswerRecord: async function (Data, Selection=""){
        const query = await Answer.find(Data).select(Selection);
        return query;
    }
};