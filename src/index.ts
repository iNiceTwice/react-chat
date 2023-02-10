import express from "express";
//import mongoose from 'mongoose';
import cors from "cors";
import { Server } from "socket.io"
import path from "path"
import { createServer } from "http"
//import userRoutes = from"./routes/userRoutes")
const app = express();

const server = createServer(app)
/*
//Connecting to DB
mongoose.connect(mongoUri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(data => console.log("- Database Online -"))
.catch(err => console.log(err));

*/


//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//api routes
//app.use(userRoutes)

//set production build
app.use(express.static(path.join(__dirname, "/client/build")))

//server settings 
app.set("port", process.env.PORT || 3000);
server.listen(app.get("port"), () => {
  console.log("- Server Online on " + app.get("port") + " -");
});

const io = new Server(server,{
  cors:{
    origin:"http://127.0.0.1:5173",
    methods:["GET","POST"]
  }
})


io.on("connection", socket =>{

  console.log(`Usuario ${socket.id} conectado` )
    
})


