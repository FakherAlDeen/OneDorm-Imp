const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Notification = require('../Schemas/NotificationSchema');
module.exports = {
    CreateNotification: (Data)=>{
        const newRecord = new Notification(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditNotification: async function (Id,Data){
        await Notification.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteNotification: async function (Id){
        await Notification.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneNotificationRecord: async function (Data, Selection=""){
        const query = await Notification.find(Data).select(Selection);
        return query;
    }
};