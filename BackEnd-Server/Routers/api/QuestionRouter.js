const router = require('express').Router();
const QuestionController = require('../../Controllers/QuestionController');

router.post('/CreatePost', QuestionController.CreatePost);

module.exports = router;