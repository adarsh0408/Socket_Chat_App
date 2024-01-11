const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB(); 

app.use(notFound);
app.use(errorHandler)
app.use('/api/user',userRoutes)


app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})