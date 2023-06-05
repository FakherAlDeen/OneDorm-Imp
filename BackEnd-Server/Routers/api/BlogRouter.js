const router = require('express').Router();
const BlogController = require('../../Controllers/BlogController');
const auth = require ('../../MiddleWare/auth')
router.post('/CreateBlog', BlogController.CreateBlog);
router.get('/GetBlog/:Id', BlogController.GetBlog);
router.post('/BlogVote' , BlogController.Vote);
router.post('/DeleteBlog' , BlogController.DeleteBlog);
router.post('/EditBlog' , BlogController.EditBlog);

module.exports = router;