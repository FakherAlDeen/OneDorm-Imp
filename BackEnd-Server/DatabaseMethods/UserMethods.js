const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
// Find -> Table
// Insert (ds,ds) Table 
const User = require('../Schemas/UserSchema');
module.exports = {
    CreateUser: (Data)=>{
        const newRecord = new User (Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditUser: async function (UserId,Data){
        await User.findOneAndUpdate(
            {UserId},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteUser: async function (Id){
        await User.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneUserRecord: async function (Data, Selection=""){     // Check if findOneById is better || How to index the new ID>?
        const query = await User.find(Data).select(Selection);
        return query;
    }

};