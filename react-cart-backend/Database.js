const mongoose = require ('mongoose');

const cartdetails = new mongoose.Schema({
    id:String,
    name:String,
    price:String,
    description:String,
    image:String, 
});
const cartcollection = mongoose.model("ShoppingCart", cartdetails)
module.exports = cartcollection