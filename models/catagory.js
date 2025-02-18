import mongoose from "mongoose";

const catagorySchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true
    }
})