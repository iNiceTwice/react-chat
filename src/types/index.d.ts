
import { Types } from "mongoose"

export interface SocketUser {
    socketID: string,
    userID: string
}

export interface ConversationDocument {
  _id:Types.ObjectId,
  members: Array<string>
}

export interface UserDocument {
    _id:Types.ObjectId,
    publicId: string,
    email:string,
    username:string,
    password:string,
    profileImage:string
}