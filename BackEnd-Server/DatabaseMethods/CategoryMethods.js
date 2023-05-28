const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/OneDormDB').
// catch(error => handleError(error));
const Category = require('../Schemas/CategorySchema');
module.exports = {
    CreateCategory: async function (Data){
        const newRecord = new Category(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditCategory: async function (CategoryId,Data){
        await Category.findOneAndUpdate(
            {CategoryId},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    EditCategoryByValue: async function (CategoryValue,Data){
        await Category.findOneAndUpdate(
            CategoryValue,
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