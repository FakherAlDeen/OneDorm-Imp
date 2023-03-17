const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors(corsOptions));
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
const {CreateUser, EditUser, DeleteUser, FindOneUserRecord} = require("./DatabaseMethods/UserMethods");
const {CreatePost , EditPost , DeletePost , FindOnePostRecord} = require("./DatabaseMethods/PostMethods");
const {CreateCategory , EditCategory , DeleteCategory , FindOneCategoryRecord} = require("./DatabaseMethods/CategoryMethods");
const {CreateBlog , EditBlog , DeleteBlog , FindOneBlogRecord} = require("./DatabaseMethods/BlogMethods");
const {CreateNotification , EditNotification , DeleteNotification , FindOneNotificationRecord} = require("./DatabaseMethods/NotificationMethods");
const {CreateChat , EditChat , DeleteChat , FindOneChatRecord} = require("./DatabaseMethods/ChatMethods");
async function brr3 (){
  console.log (await FindOneUserRecord({UserId: "231321"}, ""));
  CreatePost({PostId:"hi" , CreatedBy:"Me"});
  CreateCategory({CategoryId:"lol" , CreatedBy:"mesh_ana"});
  CreateBlog({BlogId:"ma3gool" , CreatedBy:"ghost"});
  CreateNotification({NotificationId:"shooo" , NotificationDetails:"fee 7ad ba3atlak"});
  CreateChat({ChatId:"shooo"});
}


 


brr3();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/tezk', (req, res) => {
    res.send(req.body)
})
app.use(require('./Routers'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})