const router = require('express').Router();
const RequestController = require('../../Controllers/RequestController');
// const auth = require ('../../MiddleWare/auth')

router.post('/CreateRequest', RequestController.CreateRequest);
router.get('/GetRequests', RequestController.GetRequests);
router.post('/ApproveRequest' , RequestController.ApproveRequest);
router.post('/DenyRequest' , RequestController.DenyRequest);
module.exports = router;