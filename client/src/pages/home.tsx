import Logo from "../assets/logo.png"
import AuthOptions from "../components/home/AuthOptions";
import Login from "../components/home/Login";
import { HomeProvider } from "../context/home/homeProvider";

const Home = () => {
    
   

    return (
        <HomeProvider>
            <div className="bg-pattern w-full h-full flex justify-center items-center">
                <div className="flex flex-col lg:flex-row p-5 backdrop-blur-md rounded-xl">
                    <div className=" flex items-center">
                        <img className="drop-shadow-lg" src={Logo} width={200}/>
                        <h1 className="font-bold text-6xl text-slate-800/90">Chat.io</h1>
                    </div>
                    <AuthOptions/>
                </div>
            </div>
        </HomeProvider> 
     );
}
 
export default Home;