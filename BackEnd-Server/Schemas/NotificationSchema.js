const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
    NotificationId: {type:String, default:null, unique:true, index: true} ,
    NotificationCreater: {type:String , default:null},
    NotificationTitle: {type:String , default:null},
    NotificationDetails: {},
    CreatedAt: {type: Date, default: Date.now()},
    status: {type: String , default:'Inactive'}
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;