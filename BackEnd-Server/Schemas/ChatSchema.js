const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    ChatId: {type:String, default:null, unique:true, index: true},
    FirstUserId: {type:String},
    SecondUserId: {type:String},
    ChatArr: [],
    CreatedAt:{type: Date, default: Date.now()},
    status : {type:String , default: 'seen'}
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;