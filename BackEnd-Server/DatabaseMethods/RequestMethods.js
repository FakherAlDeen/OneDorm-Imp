const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
// catch(error => handleError(error));
// Find -> Table
// Insert (ds,ds) Table 
const Request = require('../Schemas/RequestSchema');
module.exports = {
    CreateRequest: async function (Data){
        const newRecord = new Request (Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditRequest: async function (RequestId,Data){
        await Request.findOneAndUpdate(
            {RequestId},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteRequest: async function (RequestId){
        await Request.deleteOne(
            {RequestId}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneRequestRecord: async function (Data, Selection=""){     
        const query = await Request.find(Data).select(Selection);
        return query;
    },
    FindRequests: async function (Selection=""){
        const query = await Request.find({}).select(Selection);
        return query ;
    }
};