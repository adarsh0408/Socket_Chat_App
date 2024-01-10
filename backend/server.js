const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB(); 

app.get('/',(req,res)=>{
    res.send('hello')
});

app.get('/api/chat',(req,res)=>{
    res.send('hello')
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})