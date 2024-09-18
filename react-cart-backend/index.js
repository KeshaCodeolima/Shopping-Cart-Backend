const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001,()=>{
    console.log("Sever is Running");
})