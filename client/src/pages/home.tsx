import AuthOptions from "../components/home/AuthOptions";
import Login from "../components/home/Login";
import { HomeProvider } from "../context/home/homeProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.config"
import Logo from "../components/Logo";
import AnimatedShowUp from "../components/animations/AnimatedShowUp";

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        document.querySelector("html")?.classList.remove("dark")
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
                    <AnimatedShowUp>
                        <Logo/>
                    </AnimatedShowUp>
                    <AuthOptions/>
                </div>
            </div>
        </HomeProvider> 
     );
}
 
export default Home;