const mongoose = require('mongoose') ; 
const PostSchema = new mongoose.Schema({
    PostId: {type:String, default:null, unique:true},
    CreatedBy: {type:String, default:null},
    PostTitle: {type:String, default:null},
    PostType: {type:String, default:null},
    PostDetails: {type:String, default:null},
    PostUpvoteCount: {type:Number, default:0},
    PostDownVoteCount: {type:Number, default:0},
    ReportedCount: {type:Number, default:0},
    IsPinned: {type:Boolean, default:false},
    CreatedAt: {type: Date, default: Date.now()},
    LastEdit: {type:Date},
    Hashtags: [{
        Category:String
    }],
    Attachments: [{
        Attachment:String // check later
    }]
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;