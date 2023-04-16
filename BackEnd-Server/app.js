const express = require('express');
const { createServer } = require("http"); // you can use https as well
const socketIo = require("socket.io");
const app = express();
const server = createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });
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
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(require('./Routers'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})