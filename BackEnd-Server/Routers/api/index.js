const router = require('express').Router();

router.use('/', require('./AuthRouter'));

module.exports = router;