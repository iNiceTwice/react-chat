import create from "axios"

const axios = create({
   withCredentials: true,
   baseURL: "http://localhost:3000"
})

export default axios