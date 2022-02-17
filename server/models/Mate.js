const { model, Schema } = require('mongoose');

const mateSchema = new Schema({
    firstName: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model('Mate', mateSchema);