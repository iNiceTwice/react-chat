
import { Types } from "mongoose"

export interface SocketUser {
    socketID: string,
    userID: string
}

export interface ConversationDocument {
  _id:Types.ObjectId,
  members: Array<string>,
  createdAt: Date;
  updateAt: Date;
}

export interface UserDocument {
  _id:Types.ObjectId,
  publicId: string,
  email:string,
  username:string,
  password:string,
  profileImage:string,
  createdAt: Date;
  updateAt: Date;
}

export interface MessageDocument {
  _id:Types.ObjectId,
  conversationId:String,
  sender:string,
  text:string,
  createdAt: Date;
  updateAt: Date;
}