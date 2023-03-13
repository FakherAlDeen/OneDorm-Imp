const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');
app.use(express.json());
app.use(cors(corsOptions));
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}
var wtv = require('./Modules/DataBase');
const silence = new wtv({ name: 'Silence', starttime:"sdsd" });
app.get('/tezk', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})