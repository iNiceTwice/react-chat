import { Schema, model } from "mongoose"
import { UserDocument } from "../types"

const UserSchema = new Schema<UserDocument>({
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
    },
    profileImage:{
        type:String,
        required:true
    },
    themePreference:{
        type:String,
        default:"light",
        required:true
    }
},{
    timestamps:true
})
export default model<UserDocument>("chat-user", UserSchema)