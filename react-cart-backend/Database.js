const mongoose = require ('mongoose');

const cartdetails = new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    image:String, 
});
const carcollection = mongoose.model("ShoppingCart", cartdetails)
module.exports = carcollection