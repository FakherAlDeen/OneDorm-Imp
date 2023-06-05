const router = require('express').Router();
const auth = require('../../MiddleWare/auth');

router.use('/', require('./AuthRouter'));
router.use('/',auth, require('./QuestionRouter'));
router.use('/',auth, require('./AnswerRouter'));
router.use('/',auth, require('./UserRouter'));
router.use('/',auth, require('./SearchRouter'));
router.use('/',auth, require('./UploadRouter'));
router.use('/',auth, require('./RequestRouter'));
router.use('/',auth, require('./NotificationsRouter'));
router.use('/',auth, require('./BlogRouter'))
router.use('/',auth, require('./ChatRouter'));
module.exports = router;