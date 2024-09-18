const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const path = require('path');
const cartcollection = require("./Database");

const app = express();
app.use(cors());
app.use(express.json());

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
    const { name, price, description } = req.body;
    cartcollection.create({ name, price, description, image: req.file.filename })
    .then(result => res.json(result))
    .catch(err => res.json(err))
    console.log(req.file)
    
})

app.get('/getitems', async (req,res)=>{
    cartcollection.find()
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Sever is Running");
})