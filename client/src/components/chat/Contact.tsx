import { memo } from "react"

interface ContactProps {
    username: string,
    img: string,
    isOnline: boolean,
    unreadMessages:number,
    lastMessage?: string,
    lastMessageTime?:string
}

const Contact = ({username, isOnline, img, lastMessage, lastMessageTime, unreadMessages }:ContactProps) => {
    
    return ( 
        <>
            <div className="w-full flex items-center py-6 gap-4 hover:bg-slate-100/80 px-4 rounded-md">
            
                <div className="relative p-1 rounded-full min-w-[4rem] bg-primary">
                    <img src={ img } alt={username} className="w-16 h-fit"/>
                    {
                        isOnline ?
                        <div className="absolute border-2 border-secondary p-1 bg-green-500 rounded-full right-1 bottom-0"></div>
                        :
                        <div className="absolute border-2 border-secondary p-1 bg-slate-400 rounded-full right-1 bottom-0"></div>
                    }
                </div>
                
                <div className="w-[calc(80%)] max-w-[20rem] gap-[0.5]">
                    <div className="flex justify-between w-full h-full">
                        <h4 className="text-slate-800/80 font-bold text-start">{ username }</h4>
                        {
                            unreadMessages > 0 &&
                            <span className="p-[0.56rem] h-1 w-1 flex items-center justify-center shadow-sm bg-red-600 rounded-full text-white text-xs">{ unreadMessages }</span>
                        }
                    </div>
                    {
                        lastMessage &&
                        <div className="grid grid-cols-5 w-full text-xs font-medium text-slate-800/40 text-start">
                            <p className="truncate col-span-4">{lastMessage}</p>
                            <span className="text-end">{ lastMessageTime }</span>
                        </div>
                    }
                </div>
            </div>
        </>
     );
}
 
export default memo(Contact);