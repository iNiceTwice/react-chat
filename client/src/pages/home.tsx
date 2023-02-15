import Logo from "../assets/logo.png"
// https://api.dicebear.com/5.x/big-smile/svg?seed=ana
const Home = () => {
    return ( 
        <div className="bg-pattern w-full h-full flex justify-center items-center">
            <div className="flex flex-col lg:flex-row p-5 backdrop-blur-md rounded-xl">
                <div className=" flex items-center">
                    <img className="drop-shadow-lg" src={Logo} width={200}/>
                    <h1 className="font-bold text-6xl text-slate-800/90">Chat.io</h1>
                </div>
                <form className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                    <div className="flex flex-col gap-1">
                        <label>Username</label>
                        <input className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Password</label>
                        <input type="password" className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                    </div>
                    <button type="submit" className="shadow-sm bg-primary text-white rounded-full p-1 mt-2 outline-none focus:bg-primary/80 hover:bg-primary/80">Login</button>
                </form>
            </div>
        </div>
     );
}
 
export default Home;