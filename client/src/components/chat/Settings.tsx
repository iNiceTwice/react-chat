import { CiDark, CiLight } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5"

const Settings = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)

    return ( 
        <>
            <div className="relative flex justify-center items-end bg-primary h-36 w-full border-b">
               <div className="absolute -bottom-1/3 bg-white hover:bg-primary rounded-full shadow-md p-2 flex items-center justify-center">
                    <img src={user.profileImage} alt={user.username} className="w-24"  />
               </div>
            </div>
            <div className="flex flex-col mt-16">
                <h2 className="w-full text-center text-slate-800/80 text-2xl font-semibold">{user.name}</h2>
                <div className="flex flex-col gap-3 mt-10 px-4">
                    <div className="flex items-center">
                        <h4 className="text-slate-800/80"><span className="font-medium mr-2 text-slate-800/90">Public ID:</span> {user.publicId}</h4>
                        <button onClick={() => navigator.clipboard.writeText(user.publicId)} className="inline ml-4 text-slate-800/80 hover:bg-primary hover:text-white p-2 rounded-lg"><IoCopyOutline size={18}/></button>
                    </div>
                    <h4 className="text-slate-800/80"><span className="font-medium mr-2 text-slate-800/90">Email:</span> {user.email}</h4>
                    <div className="flex gap-x-4 text-slate-800 mt-4">
                        <CiLight size={25} />
                        <div>
                            <input
                                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchChecked"
                            />
                        </div>
                        <CiDark size={25} />
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Settings;