const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
    NotificationId: {type:String, default:null, unique:true},
    NotificationCreater: {type:String , default:null},
    NotificationTitle: {type:String , default:null},
    NotificationDetails: {type:String , default:null},
    CreatedAt: {type: Date, default: Date.now()},
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;