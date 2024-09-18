const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const carcollection = require('./Database');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongouri,{useNewUrlParser: true,useUnifiedTopology: true,})
.then(()=> {console.log("Database Connected Successful");
})
.catch((err)=>{console.log(err);
})

app.listen(3001,()=>{
    console.log("Sever is Running");
})