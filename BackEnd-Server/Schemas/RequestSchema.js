const mongoose = require('mongoose');
const RequestSchema = new mongoose.Schema({
    RequestId: {type:String, unique:true, index: true},
    RequesterId: {type:String , index:true},
    RequestMessage: {type:String, default:null},
});

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;