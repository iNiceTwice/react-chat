import axios from "axios"

const instance = axios.create({
   withCredentials: true,
   baseURL: "https://chatio-server.up.railway.app"
})

export default instance