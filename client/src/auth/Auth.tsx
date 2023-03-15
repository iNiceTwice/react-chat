import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "../api/axios.config"

interface Props {
  children: JSX.Element
}

const Auth = ({children}:Props):JSX.Element => {
    
    const [ error, setError ] = useState<Boolean | null>(null)

    const checkToken = async () => {
        await axios.get("/auth")
            .then(res => {
                res.status === 200 && setError(false)    
            })
            .catch(err =>{
                err.response.status === 401 && setError(true)
            })
    }
    
    useEffect(()=>{
        checkToken()
    },[])

  if(error || !localStorage.getItem("chatUser")){
    return <Navigate to="/" replace={true} />
  }
  return children
}

export default Auth