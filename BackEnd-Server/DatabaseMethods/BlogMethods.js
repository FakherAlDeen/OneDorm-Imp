const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Blog = require('../Schemas/BlogSchema');
module.exports = {
    CreateBlog: (Data)=>{
        const newRecord = new Blog(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditBlog: async function (Id,Data){
        await Blog.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteBlog: async function (Id){
        await Blog.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneBlogRecord: async function (Data, Selection=""){
        const query = await Blog.find(Data).select(Selection);
        return query;
    }
};