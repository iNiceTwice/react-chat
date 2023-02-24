import { useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

interface Props {
  children: JSX.Element
}

const Auth = ({children}:Props):JSX.Element => {
    
    const location = useLocation()
    const navigate = useNavigate()

    const checkToken = async () => {
        await axios.get("http://localhost:3000/auth", { withCredentials:true })
            .then(res => {
                res.status === 200 && location.pathname === "/" && navigate("/chat")
            })
            .catch(err =>{
                err.response.status === 401 && navigate("/")
            })
    }
    
    useEffect(()=>{
        checkToken()
    },[])

  return children
}

export default Auth