import { HomeContext } from "../../context/home/homeContext";
import { useContext } from "react";
import { CiUser, CiLogin, CiBeerMugFull } from "react-icons/ci"
import Login from "./Login";
import Register from "./Register";

const ButtonGroup = () => {
    const { setState } = useContext(HomeContext)

    return (
        <div className="flex justify-center items-center mt-10 gap-6">
            <div className="flex flex-col justify-center items-center gap-4">
                <button onClick={()=> setState({authOption:"register"})} className="bg-white rounded-full p-4 shadow-md h-fit hover:scale-105">
                    <CiUser size={25}/>
                </button>
                <p className="text-sm">Register</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <button onClick={()=> setState({authOption:"login"})} className="bg-primary text-white rounded-full p-4 shadow-md h-fit hover:scale-105">
                    <CiLogin size={25}/>
                </button>
                <p className="text-sm">Login</p>
            </div>
        </div>
    )
}


const AuthOptions = () => {
    const { state } = useContext(HomeContext)

    return ( 
        <>
            { state.authOption === null && <ButtonGroup/>}
            { state.authOption === "login" && <Login/>}
            { state.authOption === "register" && <Register/>}
        </>
        
     );
}
 
export default AuthOptions;