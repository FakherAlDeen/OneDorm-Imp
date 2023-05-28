const router = require('express').Router();
const AnswerController = require('../../Controllers/AnswerController');
const auth = require ('../../MiddleWare/auth')
router.post('/CreateAnswer', AnswerController.CreateAnswer);
router.get('/GetAnswer/:Id', AnswerController.GetAnswer);
router.post('/EditAnswer' , AnswerController.EditAnswer);

module.exports = router;