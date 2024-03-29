import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import { Server } from "socket.io"
import { createServer } from "http"
import * as dotenv from 'dotenv'
import userRoutes from "./routes/user.routes"
import messagesRoutes from "./routes/messages.routes"
import authRoutes from "./routes/auth.routes"
import conversationRoutes from "./routes/conversation.routes"
import cookieParser from "cookie-parser"
import { ContactData, SocketUser } from "./types";

dotenv.config()
const app = express();
const server = createServer(app)

//Connecting to DB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI ?? "")
.then(() => console.log("- Database Online -"))
.catch(err => console.log(err));

//middlewares
app.use(cors({origin:"https://itschat-io.vercel.app", credentials:true}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//api routes
app.use(userRoutes)
app.use(authRoutes)
app.use(conversationRoutes)
app.use(messagesRoutes)

//server settings 
app.set("port", process.env.PORT || 3001);
server.listen(app.get("port"), () => {
  console.log("- Server Online on " + app.get("port") + " -");
});

const io = new Server(server, {
  cors:{
    origin:"https://itschat-io.vercel.app",
    methods:["GET","POST"]
  }
})

let users:SocketUser[] = []

const addUser = (userID:string, socketID:string):void => {
  !users.some(user => user.socketID === socketID) && users.push({socketID, userID}) 
}

const removeUser = (socketID:string):void => {
  users = users.filter((user) => user.socketID !== socketID); 
}

const getUser = (userID:string):SocketUser => {
  return users.find((user) => user.userID === userID)!;
}

const getConnectedContacts = (contacts:ContactData[]) => {

  const connectedContacts = users.filter((obj:SocketUser) => contacts.some((o:ContactData) => obj.userID === o.contactID))
  
  return connectedContacts
}

io.on("connection", socket => {

  socket.on("add-user", (user) => {
    addUser(user.userID, socket.id)
    if(user.contacts.length > 0){
      const connected = getConnectedContacts(user.contacts) 
      io.to(socket.id).emit("send-connected", connected)  
      connected.forEach((contact:SocketUser) => {
        io.to(contact.socketID).emit("send-connected", [{socketID:socket.id, userID:user.userID}] )     
      });
    }
  })

  socket.on("send-message", ({sender, receiver, text, conversationId }) => {
    const user = getUser(receiver)

    if(user){
      io.to(user.socketID).emit("get-message", {
        conversationId,
        sender,
        receiver,
        text
      })
    }
  })

  socket.on("disconnect", () => {
    const userDisconnected = users.find(user => user.socketID === socket.id)
    io.emit("send-disconnected", userDisconnected)

    removeUser(socket.id)
    console.log(`Usuario ${socket.id} desconctado`) 
  })

  console.log(`Usuario ${socket.id} conectado` )
  
})


