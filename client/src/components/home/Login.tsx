import { HomeContext } from "../../context/home/homeContext";
import { useContext } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import axios from "axios"
import { User } from "../../types";

const loginSchema = yup.object().shape({
    email:yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().min(8,"At least 8 characters.").max(15,"Max 15 characters.").required("This field is required"),
})

const Login = () => {

    const { setState } = useContext(HomeContext)
    const navigate = useNavigate();
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues:{
        username:"",
        email:"",
        password:""
    },
    onSubmit:(values)=>{
        loginUser(values)
            .then(()=> console.log("todo en orden"))
            .catch((err)=> console.log(err))
    },
    validationSchema: loginSchema              
    })

    const loginUser = async (user:User):Promise<void> => {
      await axios.post("http://localhost:3000/login", user ,{ withCredentials: true })
        .then((res)=>{
            localStorage.setItem("chat-user", JSON.stringify(res.data.user))
            navigate("/chat")
        })
        .catch(err => console.log(err))
    }       

    return ( 
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input onChange={handleChange} name="email" className="shadow-sm py-1 px-4 rounded-full outline-none" />    
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