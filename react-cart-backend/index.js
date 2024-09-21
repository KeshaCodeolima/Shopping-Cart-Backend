const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const path = require('path');
const cartcollection = require("./Database");
const CartRegister = require("./DatabaseRegister");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('Images'))

mongoose.connect(process.env.mongouri, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log("Database Connected Successful");
    })
    .catch((err) => {
        console.log(err);
    })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), async (req, res) => {
    const { itemid,name, price, description } = req.body;
    cartcollection.create({ itemid, name, price, description, image: req.file.filename })
    .then(result => res.json(result))
    .catch(err => res.json(err))
    console.log(req.file)

})

app.get('/getitems', async (req, res) => {
    cartcollection.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
})

app.post('/register', (req, res) => {
    const { name, email, address, phonenumber, password } = req.body;
    CartRegister.create({name, email, address, phonenumber, password})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/signin', (req,res)=>{
    const {email,password} = req.body;

    CartRegister.findOne({email:email, password:password})
    .then(user=>{
        if(user){ 
            res.json("succsseful signin")
        }
        else{
            res.json("signin error")
        }
    })
    .catch(err=>res.json(err))
})

app.listen(3001, () => {
    console.log("Sever is Running");
})