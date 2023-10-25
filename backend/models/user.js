const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    telphone: String,
    company: String
})

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel; 


