import { BsThreeDotsVertical } from "react-icons/bs"
import { memo } from "react"

interface Props {
    own: boolean,
    onlyText:boolean,
    text:string,
    from:string,
    image:string,
    sendedAt:string
}

const OwnMessage = ({ from, text, sendedAt, onlyText }:Omit<Props, "image" | "own" >) => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string) 

    return (
        <>
            {
                onlyText ?
                <div className="w-full flex flex-col items-end md:pr-4">
                    <div className="flex w-11/12 mr-20">
                        <div className="mt-2 flex justify-end gap-1 w-full">
                            <div className="bg-primary py-2 px-4 rounded-lg rounded-tr-none text-white shadow-sm max-w-[15rem] lg:max-w-2xl break-words h-fit">
                                { text }
                            </div>
                        </div>
                    </div>
                </div>    
                :
                <div className="w-full flex flex-col items-end pt-4 md:pr-4">
                    <div className="rounded-full p-2 bg-primary -mb-16">
                        <img src={ user.profileImage } alt={ from } className="w-10 lg:w-12" />
                    </div>
                    <div className="flex flex-col items-end mr-20">
                        <div className="flex gap-x-4 items-center text-slate-800/60">
                            <p className="text-xs">{ sendedAt }</p>
                            <h2 className="font-semibold text-lg text-slate-800/90">You</h2>
                        </div>
                        <div className="mt-2 flex gap-1 justify-end w-full">
                            <div className="bg-primary py-2 px-4 rounded-lg rounded-tr-none text-white shadow-sm max-w-[12rem] lg:max-w-2xl break-words h-fit">
                                { text }
                            </div>
                        </div>
                    </div>
                </div>    
            }
        </>
    )    
}

const ContactMessage = ({ image, from, text, sendedAt, onlyText }:Omit<Props, "own" >) => {
    return (
        <>  
            {
                onlyText ?
                <div className="w-full flex flex-col items-start pl-4">
                    <div className="ml-20">
                        <div className="mt-2 flex gap-1">
                            <div className="bg-white py-2 px-4 rounded-lg rounded-tl-none w-fit h-fit text-slate-800/80 shadow-sm max-w-[15rem] lg:max-w-2xl break-words">
                                { text }
                            </div>
                        </div>
                    </div>
                </div> 
                :       
                <div className="w-full flex flex-col items-start pt-4 pl-4">
                    <div className="rounded-full p-2 bg-primary -mb-16">
                        <img src={ image } alt={ from } className="w-10 lg:w-12" />
                    </div>
                    <div className="ml-20">
                        <div className="flex gap-x-4 items-center text-slate-800/60">
                            <h2 className="font-semibold text-slate-800/90 text-lg">{ from }</h2>
                            <p className="text-xs">{ sendedAt }</p>
                        </div>
                        <div className="mt-2 flex gap-1">
                            <div className="bg-white py-2 px-4 rounded-lg rounded-tl-none w-fit h-fit text-slate-800/80 shadow-sm max-w-[12rem] lg:max-w-2xl break-words">
                                { text }
                            </div>
                        </div>
                    </div>
                </div>        
            }
        </>
    )
}


const Message = ({ own, from, text, image, sendedAt, onlyText }:Props) => {

    return ( 
        <>
            {
                own ? 
                <OwnMessage
                    from={from}
                    text={text}
                    sendedAt={sendedAt}
                    onlyText={onlyText}
                />
                :
                <ContactMessage
                    image={image}
                    from={from}
                    text={text}
                    sendedAt={sendedAt}
                    onlyText={onlyText}
                />

            }
        </>
     );
}
 
export default memo(Message);