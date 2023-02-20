import { Schema, model } from "mongoose"

const userSchema = new Schema({
    publicId:{
        type:String,
    },
    email:{
        type:String, 
        required:true, 
        unique:true, 
        lowercase:true, 
        trim:true
    },    
    username:{
        type:String, 
        required:true,
        trim:true
    },    
    password:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})
export default model("chat-user", userSchema)