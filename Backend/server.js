const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/db')

dotenv.config()
const app = express();

connectDb();

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is runing on Port ${PORT}`);
})