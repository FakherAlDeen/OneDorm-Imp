const router = require('express').Router();
const UserController = require('../../Controllers/UserController');
const UserMethods = require('../../DatabaseMethods/UserMethods');
const auth = require('../../MiddleWare/auth');

router.get('/GetUser/:Id', UserController.GetUser);
router.post('/AddHashtags' , UserController.AddHastags);
router.post('/AddUserDetails' , UserController.AddUserDetails);
router.post('/DeleteUser' , UserController.DeleteUser);


module.exports = router;