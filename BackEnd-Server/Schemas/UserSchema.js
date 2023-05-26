const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    UserId: {type:String, unique: true, index: true},
    Fname:{type:String, default:null},
    Lname:{type:String, default:null},
    Password:{type:String, default:null},
    Username: {type:String, unique:true , index: true , sparse: true},
    Email: {type:String, unique: true},
    Phonenumber:{type:String, default:null},
    Image: {}, //Check Later
    DateOfBirth:{type:Date, default:null},
    TotalVotes:{type:Number, default:0},
    UserDetails:{type:Object , default:null},
    UserVotes:{type:Object , default:{'test':'-1'}},
    NotificationList:[{
        Id: {type:String, default: null}
    }],
    PostList:[],
    AnswersList:[],
    ChatList:[{
        Id: {type:String, default: null}
    }],
    CategoriesList:[],
    CreatedAt:{
        type: Date,
        default: Date.now()
    },

});

const User = mongoose.model('User', UserSchema);
module.exports = User;