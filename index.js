
import express from "express";
import bodyParser from "body-parser";
import userRouter  from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt from "jsonwebtoken";
import categoryRouter from "./routes/categoryRoute.js";

import dotenv from "dotenv";
dotenv.config();





const app = express();
app.use(bodyParser.json());

const connectionString = process.env.MONGO_URL;
console.log(connectionString);

app.use((req,res,next)=>{

    const token = req.header("Authorization")?.replace("Bearer ","")
    if(token !=null){
        jwt.verify(token,process.env.JWT_SECRET,
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

console.log("JWT_SECRET:", process.env.JWT_SECRET);


app.use("/api/users",userRouter);
app.use("/api/gallery",galleryItemRouter);
app.use("/api/categories",categoryRouter);


app.listen(5000,(req,res)=>
{
    console.log("server is running on port 5000");
})
