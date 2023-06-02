const express = require('express');
const { createServer } = require("http"); 
const { CreateNotification } = require('./DatabaseMethods/NotificationMethods')
const { EditUser,FindOneUserRecord } = require ('./DatabaseMethods/UserMethods')
const { v4: uuidv4 } = require('uuid');

const socketIo = require("socket.io");
const app = express();
const server = createServer(app);
const io = require('./Helpers/socket.js').init(server);
const port = 3000
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors(corsOptions));
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', (msg) => {
    socket.join(msg);
    console.log (msg)
    console.log(socket.rooms)
  });
  socket.on ('NotificationSend',async (msg)=>{
    console.log ('msg',msg);
    if (msg.Type=='Question'){
      try{
        let NotificationId = uuidv4();
        const notification = {
          NotificationId,
          NotificationCreater: msg.PostCreator,
          NotificationTitle: msg.AnswerCreatorName,
          NotificationDetails:{
            redirectLink: msg.QuestionId,
            ReplytoAns: false,
          },
          CreatedAt:msg.CreatedAt
        }
        if (msg.PostCreator != msg.AnswerCreatorName){
          await CreateNotification(notification);
          await EditUser(msg.PostCreator,{$push: { NotificationList: NotificationId }})
          io.to(msg.PostCreator).emit('Notifications',NotificationId);
          console.log(socket.rooms)
        }
      } catch (e){
        console.log (e);
      }
    }
    else if (msg.Type=='Answer'){
      let NotificationId = uuidv4();
        const notification = {
          NotificationId,
          NotificationCreater: msg.PostCreator,
          NotificationTitle: msg.AnswerCreatorName,
          NotificationDetails:{
            redirectLink: msg.QuestionId,
            ReplytoAns: true,
          },
          CreatedAt:msg.CreatedAt
        }
        if (msg.ParentId != msg.AnswerCreatorName){
          await CreateNotification(notification);
          await EditUser(msg.ParentId,{$push: { NotificationList: NotificationId }})
          io.to(msg.ParentId).emit('Notifications',NotificationId);
        }
    }
    
  })

});
app.use((req, res, next) => {
  req.io = io;
  return next();
});
const mongoose = require('mongoose');
const { CreateCategory } = require('./DatabaseMethods/CategoryMethods');
const connectDB = async () => {
  try {
      const conn = await mongoose.connect('mongodb+srv://fakheralden1:CHBsfnMo4Rzc9qZT@onedorm.nmnmx8u.mongodb.net/');
      console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};
connectDB();


app.use(require('./Routers'));

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
})