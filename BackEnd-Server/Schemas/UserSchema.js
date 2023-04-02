const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    UserId: {type:String, unique: true, index: true},
    Fname:{type:String, default:null},
    Lname:{type:String, default:null},
    Password:{type:String, default:null},
    Username: {type:String, default:null},
    Email: {type:String, unique: true},
    Phonenumber:{type:String, default:null},
    Image: {type:String, default:null}, //Check Later
    DateOfBirth:{type:Date, default:null},
    NotificationList:[{
        Id: {type:String, default: null}
    }],
    PostList:[{
        Id: {type:String, default: null}
    }],
    ChatList:[{
        Id: {type:String, default: null}
    }],
    CategoriesList:[{
        Id: {type:String, default: null}
    }],
    CreatedAt:{
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;