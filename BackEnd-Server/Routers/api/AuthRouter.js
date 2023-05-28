const router = require('express').Router();
const AuthController = require('../../Controllers/AuthController');
const auth = require('../../MiddleWare/auth');

router.post('/SignUp', AuthController.SignUp);
router.post('/LogIn', AuthController.LogIn);

module.exports = router;