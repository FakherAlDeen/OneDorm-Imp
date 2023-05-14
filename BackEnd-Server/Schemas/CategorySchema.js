const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    CategoryId: {type:String, unique:true, index: true},
    CategoryTitle: {type:String , index:true},
    UserCount: {type:Number, default:0},
    PostIds: [],
    CreatedAt:{type: Date, default: Date.now()},
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;