const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    CategoryId: {type:String, default:null, unique:true},
    CategoryTitle: {type:String , default:null},
    UserCount: {type:Number, default:0},
    PostIds: {Id: String},
    CreatedAt:{type: Date, default: Date.now()},
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;