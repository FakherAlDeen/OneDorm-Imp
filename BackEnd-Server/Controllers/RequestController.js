const { v4: uuidv4 } = require('uuid');
const {CreateRequest,FindRequests,FindOneRequestRecord, DeleteRequest} = require('../DatabaseMethods/RequestMethods');
const {EditUser} = require('../DatabaseMethods/UserMethods');
const { findOne } = require('../Schemas/RequestSchema');

class RequestController {
    static async CreateRequest(req, res){
        try{
            const { UserId, RequestMessage } = req.body; 
            if (!(UserId && RequestMessage)) {
              return res.status(400).send("Send all the fields");
            }
            let RequestId = uuidv4()
            const request = {
                RequestId,
                RequesterId:UserId,
                RequestMessage
            }
            await CreateRequest(request);
            await EditUser(UserId , {VerificationState : "pending"} )
            res.status(201).send(request)
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
    }
    static async GetRequests(req, res){
        try{
            const request = await FindRequests();
            res.status(201).send(request)
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
    }
    static async ApproveRequest(req, res){
        try{
            const { RequestId } = req.body; 
            if (!(RequestId)) {
              return res.status(400).send("Send all the fields");
            }
            const request = await FindOneRequestRecord({RequestId});
            await EditUser(request[0].RequesterId , {VerificationState : "active"} )
            await DeleteRequest(RequestId);
            res.status(201).send(request)
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
    }
    static async DenyRequest(req, res){
        try{
            const { RequestId } = req.body; 
            if (!(RequestId)) {
              return res.status(400).send("Send all the fields");
            }
            const request = await FindOneRequestRecord({RequestId});
            await EditUser(request[0].RequesterId , {VerificationState : "denied"} )
            await DeleteRequest(RequestId);
            res.status(201).send(request)
        } catch (err) {
            res.status(403).send(err) 
            console.log(err);
        }
    }
}

module.exports = RequestController;