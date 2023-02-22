import { Schema, model } from "mongoose"

interface UserDocument {
    publicId: string,
    email:string,
    username:string,
    password:string,
    profileImage:string
    contacts:Array<string>,
}

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
    contacts:{
        type:[String],
        required:true,
    
    }
},{
    timestamps:true
})
export default model<UserDocument>("chat-user", UserSchema)