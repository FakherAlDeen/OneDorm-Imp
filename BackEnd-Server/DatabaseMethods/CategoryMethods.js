const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
catch(error => handleError(error));
const Category = require('../Schemas/CategorySchema');
module.exports = {
    CreateCategory: (Data)=>{
        const newRecord = new Category(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditCategory: async function (Id,Data){
        await Category.findOneAndUpdate(
            {Id},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteCategory: async function (Id){
        await Category.deleteOne(
            {Id}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneCategoryRecord: async function (Data, Selection=""){
        const query = await Category.find(Data).select(Selection);
        return query;
    }
};