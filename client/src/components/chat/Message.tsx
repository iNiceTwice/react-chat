import { BsThreeDotsVertical } from "react-icons/bs"

interface Props {
    own: boolean,
    text:string,
    from:string,
    image:string,
    sendedAt:string
}

const Message = ({ own, from, text, image, sendedAt }:Props) => {
   
    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const time = new Date(sendedAt)
    const localTime = time.toTimeString().slice(0,5)

    return ( 
        <>
            {
                own ? 
                <div className="w-full flex flex-col items-end py-4 px-10">
                    <div className="rounded-full p-2 bg-primary -mb-11">
                        <img src={user.profileImage} alt={from} className="w-10 lg:w-12" />
                    </div>
                    <div className="flex flex-col items-end mr-20">
                        <div className="flex gap-x-4 items-center text-slate-800/60">
                            <p className="text-xs">{ localTime }</p>
                            <h2 className="font-semibold text-slate-800/90">You</h2>
                        </div>
                        <div className="mt-2 flex gap-1">
                            <button className="text-slate-400 hover:scale-110"><BsThreeDotsVertical size={16}/></button>
                            <div className="bg-primary py-2 px-4 rounded-lg rounded-tr-none w-fit h-fit text-white shadow-sm">
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="w-full flex flex-col items-start py-4 px-10">
                    <div className="rounded-full p-2 bg-primary -mb-11">
                        <img src={image} alt={from} className="w-10 lg:w-12" />
                    </div>
                    <div className="ml-20">
                        <div className="flex gap-x-4 items-center text-slate-800/60">
                            <h2 className="font-semibold text-slate-800/90">{from}</h2>
                            <p className="text-xs">{ localTime }</p>
                        </div>
                        <div className="mt-2 flex gap-1">
                            <div className="bg-white py-2 px-4 rounded-lg rounded-tl-none w-fit h-fit text-slate-800/80 shadow-sm">
                                {text}
                            </div>
                            <button className="text-slate-400 hover:scale-110"><BsThreeDotsVertical size={16}/></button>
                        </div>
                    </div>
                </div>
            }
        </>
     );
}
 
export default Message;