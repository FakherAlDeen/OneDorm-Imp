const router = require('express').Router();
const UserController = require('../../Controllers/UserController');
const auth = require('../../MiddleWare/auth');

router.get('/GetUser/:Id', UserController.GetUser);

module.exports = router;