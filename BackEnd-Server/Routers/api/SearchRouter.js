const router = require('express').Router();
const SearchController = require('../../Controllers/SearchController');
const auth = require ('../../MiddleWare/auth')

router.get('/SearchPost', SearchController.SearchPost);


module.exports = router;