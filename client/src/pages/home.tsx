import Logo from "../assets/logo.png"
import AuthOptions from "../components/home/AuthOptions";
import Login from "../components/home/Login";
import { HomeProvider } from "../context/home/homeProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("chatUser")) navigate("/chat")
    }, []);

    return (
        <HomeProvider>
            <div className="bg-pattern w-full h-full flex justify-center items-center">
                <div className="flex flex-col lg:flex-row p-5 backdrop-blur w-full lg:w-fit rounded-xl min-h-[20rem] gap-x-16 gap-y-6">
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