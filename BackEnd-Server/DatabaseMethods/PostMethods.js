const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Post = require('../Schemas/PostSchema');
module.exports = {
    CreatePost: (Data)=>{
        const newRecord = new Post (Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditPost: async function (Id,Data){
        await Post.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeletePost: async function (Id){
        await Post.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOnePostRecord: async function (Data, Selection=""){
        const query = await Post.find(Data).select(Selection);
        return query;
    }

};