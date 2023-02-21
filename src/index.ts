import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import { Server } from "socket.io"
import { createServer } from "http"
import * as dotenv from 'dotenv'
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"
import cookieParser from "cookie-parser"
import { SocketUser } from "./types";

dotenv.config()
const app = express();
const server = createServer(app)

//Connecting to DB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI ?? "")
.then(() => console.log("- Database Online -"))
.catch(err => console.log(err));

//middlewares
app.use(cors({origin:"http://localhost:3001", credentials:true}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//api routes
app.use(userRoutes)
app.use(authRoutes)

//server settings 
app.set("port", process.env.PORT || 3000);
server.listen(app.get("port"), () => {
  console.log("- Server Online on " + app.get("port") + " -");
});

const io = new Server(server, {
  cors:{
    origin:"http://localhost:3001",
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

io.on("connection", socket =>{
  socket.on("add-user", (userID) => {
    addUser(userID, socket.id)
    console.log("hola", users)
  })

  socket.on("disconnect", () => {
    removeUser(socket.id)
    console.log(`Usuario ${socket.id} desconctado`)
  })
  console.log(`Usuario ${socket.id} conectado` )
    
})


