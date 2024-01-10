const mongoose = require('mongoose');
require('dotenv').config();

const  connectDB = async ()=>{
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
        console.log("MongoDB Connected");

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
} 


module.exports = connectDB;