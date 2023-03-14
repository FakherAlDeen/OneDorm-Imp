const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');
app.use(express.json());
app.use(cors(corsOptions));
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
const {CreateUser, EditUser, DeleteUser, FindOneUserRecord} = require ("./Controllers/UserController");
async function brr3 (){
  console.log (await FindOneUserRecord({Id: "dsdsds"}, ""));
}
brr3();
app.get('/tezk', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})