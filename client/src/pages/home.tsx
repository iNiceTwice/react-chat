import Logo from "../assets/logo.png"
import AuthOptions from "../components/home/AuthOptions";
import Login from "../components/home/Login";
import { HomeProvider } from "../context/home/homeProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.config"

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/auth")
            .then(res => {
                if(localStorage.getItem("chatUser") && res.status === 200) 
                    navigate("/chat")
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <HomeProvider>
            <div className="bg-pattern w-full h-full flex justify-center items-center">
                <div className="flex flex-col items-center lg:flex-row p-5 backdrop-blur w-full lg:w-fit rounded-xl min-h-[20rem] gap-x-16 gap-y-6">
                    <div className="flex items-center justify-center">
                        <img className="drop-shadow-lg w-28 lg:w-[12vw]" src={Logo}/>
                        <h1 className="font-bold text-5xl lg:text-6xl text-slate-800/90">Chat.io</h1>
                    </div>
                    <AuthOptions/>
                </div>
            </div>
        </HomeProvider> 
     );
}
 
export default Home;