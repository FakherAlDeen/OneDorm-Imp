const {FindOneNotificationRecord, EditNotification} = require('../DatabaseMethods/NotificationMethods')

class NotificationController {
    static async GetNotification(req, res) {
        try{
            const NotId = req.params.Id;
            const Notification = await FindOneNotificationRecord({NotificationId:NotId});
            res.status(201).send(Notification[0]);
        }catch(e){
            res.status(403).send(err);
            console.log(err);
        }
    }
    static async OpenNotification(req, res) {
        try{
            const NotId = req.params.Id;
            const Notification = await EditNotification(NotId, {status:'Active'});
            res.status(201).send('Done!');
        }catch(e){
            res.status(403).send(err);
            console.log(err);
        }
    }
}

module.exports = NotificationController;