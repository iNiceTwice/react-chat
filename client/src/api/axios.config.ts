import axios from "axios"

const instance = axios.create({
   withCredentials: true,
   baseURL: "http://localhost:3001"
   //baseURL: "https://chatio-server.up.railway.app"
})

export default instance