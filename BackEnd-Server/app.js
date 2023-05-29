const express = require('express');
const { createServer } = require("http"); // you can use https as well
const socketIo = require("socket.io");
const app = express();
const server = createServer(app);
const io = require('./Helpers/socket.js').init(server);
const port = 3000

const SearchController = require('./Controllers/SearchController')
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
    // console.log (socket.rooms)
  });

});
// console.log(io);
app.use((req, res, next) => {
  req.io = io;
  return next();
});
const mongoose = require('mongoose');
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // SearchController.SearchPost('x','x');
})