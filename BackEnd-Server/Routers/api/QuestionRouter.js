const router = require('express').Router();
const QuestionController = require('../../Controllers/QuestionController');
const auth = require ('../../MiddleWare/auth')
router.post('/CreatePost', QuestionController.CreatePost);
router.get('/GetPost/:Id', QuestionController.GetPost);


module.exports = router;