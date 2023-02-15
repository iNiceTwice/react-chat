import { HomeContext } from "../../context/home/homeContext";
import { useContext } from "react";

const AuthOptions = () => {
     const { state, setState } = useContext(HomeContext)

    return ( 
        <div className="flex flex-col gap-6 ml-14">
            <div className="flex items-center gap-4">
                <button className="rounded-full p-7 shadow-md h-fit hover:scale-105"></button>
                <p className="text-sm">Register</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="rounded-full p-7 shadow-lg h-fit hover:scale-105 shadow-primary/40 bg-primary"></button>
                <p className="text-sm">Enter as a guest</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="rounded-full p-7 shadow-md h-fit hover:scale-105"></button>
                <p className="text-sm">Login</p>
            </div>
        </div>
     );
}
 
export default AuthOptions;