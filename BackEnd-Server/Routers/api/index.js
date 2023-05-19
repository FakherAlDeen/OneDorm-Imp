const router = require('express').Router();
const auth = require('../../MiddleWare/auth');

router.use('/', require('./AuthRouter'));
router.use('/', require('./QuestionRouter'));
router.use('/', require('./AnswerRouter'));
router.use('/', require('./UserRouter'));

module.exports = router;