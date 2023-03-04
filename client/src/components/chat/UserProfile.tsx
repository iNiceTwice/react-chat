import { IoCopyOutline } from "react-icons/io5"

interface Props {
    children?: JSX.Element | JSX.Element[],
    img:string,
    username:string,
    publicId:string,
    email?:string,
}

const UserProfile = ({ children, img, username, publicId, email }:Props) => {

    return ( 
        <>
            <div className="relative flex justify-center items-end bg-primary h-36 w-full border-b">
               <div className="absolute -bottom-1/3 bg-white hover:bg-primary rounded-full shadow-md p-2 flex items-center justify-center">
                    <img src={img} alt={username} className="w-24"  />
               </div>
            </div>
            <div className="flex flex-col mt-16">
                <h2 className="w-full text-center text-slate-800/80 text-2xl font-semibold">{username}</h2>
                <div className="flex flex-col gap-3 mt-10 px-4">
                    <div className="flex items-center">
                        <h4 className="text-slate-800/80"><span className="font-medium mr-2 text-slate-800/90">Public ID:</span> {publicId}</h4>
                        <button onClick={() => navigator.clipboard.writeText(publicId)} className="inline ml-4 text-slate-800/80 hover:bg-primary hover:text-white p-2 rounded-lg"><IoCopyOutline size={18}/></button>
                    </div>
                    {
                        email ?
                        <h4 className="text-slate-800/80"><span className="font-medium mr-2 text-slate-800/90">Email:</span> {email}</h4>
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