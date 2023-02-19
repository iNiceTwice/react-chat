import { HomeContext } from "../../context/home/homeContext";
import { useContext } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import * as yup from "yup"
import { useFormik } from "formik"
import axios from "axios"
import { User } from "../../types";

const registerSchema = yup.object().shape({
    username: yup.string().min(4,"At least 4 characters.").max(15,"Max 15 characters.").required("This field is required"),
    email:yup.string().email("Invalid email").required("This field is required"),
    password: yup.string().min(8,"At least 8 characters.").max(15,"Max 15 characters.").required("This field is required"),
})

const Register = () => {

    const { setState } = useContext(HomeContext)
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues:{
        username:"",
        email:"",
        password:""
    },
    onSubmit:(values)=>{
        registerUser(values)
            .then(()=> console.log("todo en orden"))
            .catch((err)=> console.log(err))
    },
    validationSchema: registerSchema              
    })

    const registerUser = async (user:User):Promise<void> => {
      await axios.post("http://localhost:3000/register", user ,{ withCredentials: true })
    }             
    return ( 
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input name="username" onChange={handleChange} placeholder="eg.: Jhon Doe" className="shadow-sm py-1 px-4 rounded-full outline-none" /> 
                    { touched.username && Boolean(errors.username) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.username }</span> }                      
                </div>
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input name="email" onChange={handleChange} className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                    { touched.email && Boolean(errors.email) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.email }</span> }                                          
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <input name="password" onChange={handleChange} type="password" className="shadow-sm py-1 px-4 rounded-full outline-none"/>    
                    { touched.password && Boolean(errors.password) && <span className="ml-4 mb-1 -mt-1 text-sm text-red-600 w-full">{ errors.password }</span> }                                          
                </div>
                <button type="submit" className="shadow-sm bg-primary text-white rounded-full p-1 mt-2 outline-none focus:bg-primary/80 hover:bg-primary/80">Register</button>
                <a onClick={()=>setState({ authOption:null })} className="flex gap-1 items-center cursor-pointer text-sm text-primary"><HiOutlineArrowLongLeft size={20}/>Back</a>
            </form>
        </>
     );
}
 
export default Register;