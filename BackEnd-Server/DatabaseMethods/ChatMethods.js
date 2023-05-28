const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
// catch(error => handleError(error));
const Chat = require('../Schemas/ChatSchema');
module.exports = {
    CreateChat: async function (Data){
        const newRecord = new Chat(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditChat: async function (Id,Data){
        await Chat.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteChat: async function (Id){
        await Chat.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneChatRecord: async function (Data, Selection=""){
        const query = await Chat.find(Data).select(Selection);
        return query;
    }
};