const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    BlogId: {type:String, default:null, unique:true, index: true},
    BlogDetails: {type:Object , default:null},
    BlogDetailsHTML: {type:String , default:null},
    BlogTitle: {type:String , default:null},
    BlogVotesCount: {type:Number , default:0},
    AnswersList: [],
    CreatedBy: {type:String, default:null},
    CreatedAt: {type: Date, default: Date.now()},
    LastEdit: {type:Date},
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;