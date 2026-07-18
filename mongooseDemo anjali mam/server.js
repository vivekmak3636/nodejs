const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
dotenv.config();
const {router}=require('./routes/productRoutes');
const app=express();
app.use(express.json());
app.use("/api/auth",router);
connectDB();

app.get('/',(req,res)=>{
    res.send("server is working..");
})

app.listen(process.env.PORT,()=>{
    console.log("server is wokring...");
    
})