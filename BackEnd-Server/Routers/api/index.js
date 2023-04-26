const router = require('express').Router();

router.use('/', require('./AuthRouter'));
router.use('/', require('./QuestionRouter'));

module.exports = router;