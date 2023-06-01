const router = require('express').Router();
const NotificationController = require('../../Controllers/NotificationController');
const auth = require('../../MiddleWare/auth');

router.get('/GetNotification/:Id', NotificationController.GetNotification);
router.get('/OpenNotification/:Id', NotificationController.OpenNotification);

module.exports = router;