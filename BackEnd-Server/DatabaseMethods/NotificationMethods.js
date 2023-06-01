const mongoose = require('mongoose');
const Notification = require('../Schemas/NotificationSchema');
module.exports = {
    CreateNotification: async function (Data){
        const newRecord = new Notification(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditNotification: async function (NotificationId,Data){
        await Notification.findOneAndUpdate(
            {NotificationId},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteNotification: async function (NotificationId){
        await Notification.deleteOne(
            {NotificationId}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneNotificationRecord: async function (Data, Selection=""){
        const query = await Notification.find(Data).select(Selection);
        return query;
    }
};