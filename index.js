
import express from "express";
import bodyParser from "body-parser";
import userRouter  from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt from "jsonwebtoken";
import categoryRouter from "./routes/categoryRoute.js";

import dotenv from "dotenv";
dotenv.config(); // This line loads the .env file





const app = express();
app.use(bodyParser.json());

const connectionString = "mongodb+srv://supun:123@cluster0.nhzn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(connectionString);

app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ","")
    if(token !=null){
        jwt.verify(token,"secretKey"
        ,
            (err,decoded)=>{
            if(decoded != null){
                req.user = decoded;
                console.log(decoded);
                next();
            }else{
                next();
            }
        })
    }else{
        next();
    }
})


mongoose.connect(connectionString).then(
    ()=>
    {
        console.log("db connected");
    }
).catch(
    ()=>{
        console.log("db not connected");
    }
)



app.use("/api/users",userRouter);
app.use("/api/gallery",galleryItemRouter);
app.use("/api/categories",categoryRouter);

console.log("JWT_SECRET:", "secretKey");


app.listen(5000,(req,res)=>
{
    console.log("server is running on port 5000");
})
