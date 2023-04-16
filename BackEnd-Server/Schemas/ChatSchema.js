const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    ChatId: {type:String, default:null, unique:true, index: true},
    ChatArr: [{
        Message:String // check later
    }],
    CreatedAt:{type: Date, default: Date.now()},
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;