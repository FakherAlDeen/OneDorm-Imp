const router = require('express').Router();
const UploadController = require('../../Controllers/UploadController');
const upload = require ('../../MiddleWare/Upload')
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" })


router.post('/UploadImage',upload.single('Image'), UploadController.UploadImage);
router.get('/GetImage/:UserId', UploadController.GetImage);
module.exports = router;