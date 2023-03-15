const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    UserId: {type:String, default:null, unique: true},
    Fname:{type:String, default:null},
    Lname:{type:String, default:null},
    Password:{type:String, default:null},
    Username: {type:String, default:null, unique: true},
    Email: {type:String, default:null, unique: true},
    Phonenumber:{type:String, default:null},
    Image: {type:String, default:null}, //Check Later
    DateOfBirth:{type:Date, default:null},
    NotificationList:[{
        Id: String
    }],
    PostList:[{
        Id:String
    }],
    ChatList:[{
        Id:String
    }],
    CategoriesList:[{
        Id:String
    }],
    CreatedAt:{
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;