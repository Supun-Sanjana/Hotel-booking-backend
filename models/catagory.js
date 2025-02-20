import mongoose from "mongoose";

const catagorySchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    price :{
        type : Number,
        required : true
    },
    features: [
        {
        type: String,
        }
    ],
    description:{
        type: String,
        required: true
    },
    image :{
        type : String
    }

})


const category = mongoose.model("category",catagorySchema);

export default category