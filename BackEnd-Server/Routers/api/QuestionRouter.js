const router = require('express').Router();
const QuestionController = require('../../Controllers/QuestionController');
const auth = require ('../../MiddleWare/auth')
router.post('/CreatePost', QuestionController.CreatePost);

module.exports = router;