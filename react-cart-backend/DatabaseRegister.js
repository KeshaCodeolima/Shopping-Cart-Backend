const mongoose = require('mongoose')

const cartregister = new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    phonenumber:String,
    password:String,
});
const CartRegister = mongoose.model("CartUserDetails", cartregister)
module.exports = CartRegister 