import { HomeContext } from "../../context/home/homeContext";
import { useContext, useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import axios from "../../api/axios.config"
import { User } from "../../types";
import ErrorMessage from "../ErrorMessage";

interface Error {
    isError: Boolean,
    message: string
}

const loginSchema = yup.object().shape({
    email:yup.string().email("Invalid email").required("This field is required"),
})

const Login = () => {

    const { setState } = useContext(HomeContext)
    const [ badCredentials, setBadCredentials ] = useState<Error>({isError:false, message:""})
    const navigate = useNavigate();
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues:{
        email:"",
    },
    onSubmit:(values)=>{
        loginUser(values)
    },
    validationSchema: loginSchema              
    })

    const loginUser = (user:Pick<User, "email">):void => {
        axios.post("/login", user)
            .then((res)=>{
                localStorage.setItem("chatUser", JSON.stringify(res.data.user))
                navigate("/chat")
            })
            .catch(err => {
                err.response.status !== 401 ?
                setBadCredentials({isError:true, message:"Server error, try again."}) : setBadCredentials({isError:true, message:"Bad credentials."})
                console.log(err)
            })
    }       

    return ( 
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                {
                    badCredentials.isError && <ErrorMessage message={ badCredentials.message } />
                }
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input onChange={handleChange} name="email" className="shadow-sm py-1 px-4 rounded-full outline-none" /> 
                    { touched.email && Boolean(errors.email) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.email }</span> }      
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <input onChange={handleChange} name="password" type="password" className="shadow-sm py-1 px-4 rounded-full outline-none"/> 
                </div>
                <button type="submit" className="shadow-sm bg-primary text-white rounded-full p-1 mt-2 outline-none focus:bg-primary/80 hover:bg-primary/80">Login</button>
                <a onClick={()=>setState({ authOption:null })} className="flex gap-1 items-center cursor-pointer text-sm text-primary"><HiOutlineArrowLongLeft size={20}/>Back</a>
            </form>
        </>
     );
}
 
export default Login;