import mongoose from "mongoose";


//creating structure of user

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
    },
    img : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    password : {
        type : String,
        required : true
    },
    disabled : {
        type : Boolean,
        required : true,
        default : false
    },
    emailVerified : {
        type : Boolean,
        required : true,
        default : false
    }
})

//creating model             collection name , schema
const User = mongoose.model("User",userSchema);

export default User;