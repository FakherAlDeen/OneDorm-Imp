const router = require('express').Router();
const UserController = require('../../Controllers/UserController');
const UserMethods = require('../../DatabaseMethods/UserMethods');
const auth = require('../../MiddleWare/auth');

router.get('/GetUser/:Id', UserController.GetUser);
router.post('/AddHashtags' , UserController.AddHastags);
router.post('/RemoveHashtag' , UserController.RemoveHashtag)
router.post('/EditProfile' , UserController.EditProfile);
router.post('/DeleteUser' , UserController.DeleteUser);
router.post('/SetUsername' , UserController.SetUsername);
router.post('/ChangePassword' , UserController.ChangePassword);
router.get('/GetUserPosts/:Id', UserController.GetUserPosts);
router.get('/GetUserBlogs/:Id', UserController.GetUserBlogs);

module.exports = router;