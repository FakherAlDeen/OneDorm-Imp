const mongoose = require('mongoose');
const kittySchema = new mongoose.Schema({
    name: String,
});

mongoose.connect('mongodb://127.0.0.1:27017/test');
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence', starttime:"sdsd" });

module.exports = mongoose.model('wtv', kittySchema);