const express = require('express');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})