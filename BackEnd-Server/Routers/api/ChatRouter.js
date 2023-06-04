const router = require('express').Router();
const ChatController = require('../../Controllers/ChatController');
const auth = require('../../MiddleWare/auth');

router.post('/CreatChat', ChatController.CreateChat);

module.exports = router;