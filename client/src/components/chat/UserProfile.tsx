import { IoCopyOutline } from "react-icons/io5"
import Menu from "./Menu";
import { toast} from 'react-toastify'

interface Props {
    children?: JSX.Element | JSX.Element[],
    img:string,
    username:string,
    publicId:string,
    email?:string,
}

const UserProfile = ({ children, img, username, publicId, email }:Props) => {
    
    const notify = () => toast.success("Copied to clipboard.")

    const handleClick = () => {
        navigator.clipboard.writeText(publicId)
        notify()
    }

    return ( 
        <>
            <div className="relative flex justify-center items-end bg-primary h-36 w-full border-b border-tertiary dark:border-tertiary_dark">
                <div className="absolute top-0 right-0 p-4">
                    <Menu/>
                </div>
               <div className="absolute -bottom-1/3 bg-secondary hover:bg-primary rounded-full shadow-md p-2 flex items-center justify-center">
                    <img src={ img } alt={ username } className="w-24"/>
               </div>
            </div>
            <div className="flex flex-col mt-16">
                <h2 className="w-full text-center text-slate-800/80 dark:text-slate-200 text-2xl font-semibold">{ username }</h2>
                <div className="flex flex-col gap-3 mt-10 px-4">
                    <div className="flex items-center">
                        <h4 className="text-slate-800/80 dark:text-slate-200"><span className="font-medium mr-2 text-slate-800/90 dark:text-slate-200">Public ID:</span> { publicId }</h4>
                        <button onClick={ handleClick } className="inline ml-4 text-slate-800/80 dark:text-slate-200 hover:bg-primary hover:text-white p-2 rounded-lg"><IoCopyOutline size={18}/></button>
                    </div>
                    {
                        email ?
                        <h4 className="text-slate-800/80 dark:text-slate-200"><span className="font-medium mr-2 text-slate-800/90 dark:text-slate-200">Email:</span> { email }</h4>
                        :
                        null
                    }
                    {
                        children
                    }                   
                </div>
            </div>
        </>
     );
}
 
export default UserProfile;