import { HomeContext } from "../../context/home/homeContext";
import { useContext, useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import axios from "../../api/axios.config";
import { User } from "../../types";
import { CiUnread, CiRead } from "react-icons/ci";

interface Error {
    isError:{
        username:Boolean,
        email:Boolean
    },
    message?: "already taken." | "Server error, try again."
}

const registerSchema = yup.object().shape({
    username: yup.string().min(4,"At least 4 characters.").max(15,"Max 15 characters.").matches(/^\S*$/, "Word spacing is not allowed").required("This field is required"),
    email:yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().min(8,"At least 8 characters.").max(15,"Max 15 characters.").required("This field is required"),
})

const Register = () => {

    const navigate = useNavigate();
    const { setState } = useContext(HomeContext)
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [ alreadyTakenError, setAlreadyTakenError ] = useState<Error>({
        isError:{
            username:false,
            email:false
        }
    })
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues:{
        username:"",
        email:"",
        password:""
    },
    onSubmit:(values)=>{
        registerUser(values)
    },
    validationSchema: registerSchema              
    })

    const registerUser = (user:User):void => {
        axios.post("/register",user)
            .then((res)=>{
                localStorage.setItem("chatUser", JSON.stringify(res.data.user))
                navigate("/chat")
            })
            .catch((err) => {
                err.response.status !== 409 ?
                setAlreadyTakenError({
                    isError:{
                        username:err.response.data.username,
                        email:err.response.data.email
                    }, message:"Server error, try again."
                }) 
                : 
                setAlreadyTakenError({
                    isError:{
                        username:err.response.data.username,
                        email:err.response.data.email
                    }, 
                    message:"already taken."
                })
                console.log(err)
            })
    }             

    const handleShowPassword = () => {
       setShowPassword(prev => !prev) 
    }

    return ( 
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                <div className="flex justify-center">
                    <div className="p-4 w-40 h-40 flex items-center justify-center bg-white shadow-md rounded-full">
                        <img src={`https://api.dicebear.com/5.x/big-smile/svg?seed=${values.username}`} alt="Your avatar."/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input name="username" onChange={handleChange} placeholder="eg.: Jhon Doe" className="shadow-sm py-1 px-4 rounded-full outline-none" /> 
                    { touched.username && Boolean(errors.username) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.username }</span> }
                    { alreadyTakenError.isError.username && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{`Username is ${ alreadyTakenError.message }` }</span>}                                            
                </div>
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input 
                        name="email" 
                        onChange={handleChange} 
                        className="shadow-sm py-1 px-4 rounded-full outline-none" 
                    />    
                    { touched.email && Boolean(errors.email) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.email }</span> }
                    { alreadyTakenError.isError.email && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{`Email is ${ alreadyTakenError.message }`  }</span>}                                          
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <div className="w-full flex items-center shadow-sm rounded-full bg-white">
                        <input 
                            name="password"
                            onChange={handleChange} 
                            type={showPassword ? "text" : "password"} 
                            className="w-full py-1 px-4 rounded-full outline-none"
                        />
                        <button onClick={handleShowPassword} type="button" className="w-8 h-8">
                            {
                                showPassword ?
                                <CiUnread className="text-slate-400" size={20} />
                                :   
                                <CiRead className="text-slate-400" size={20} />   
                            }
                        </button>
                    </div>
                    { touched.password && Boolean(errors.password) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.password }</span> }                                          
                </div>
                <button 
                    type="submit" 
                    className="shadow-sm bg-primary text-white rounded-full p-1 mt-2 outline-none focus:bg-primary/80 hover:bg-primary/80"
                >
                    Register
                </button>
                <a
                     onClick={()=>setState({ authOption:null })} 
                     className="flex gap-1 items-center cursor-pointer text-sm text-primary"
                >
                    <HiOutlineArrowLongLeft size={20}/>Back
                </a>
            </form>
        </>
     );
}
 
export default Register;