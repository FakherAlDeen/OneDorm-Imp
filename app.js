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
async function brr3 (){
  console.log (await FindOneUserRecord({UserId: "231321"}, ""));
  CreatePost({PostId:"hi" , CreatedBy:"Me"});
}
// brr3();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/tezk', (req, res) => {
    res.send(req.body)
})
app.use(require('./Routers'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})