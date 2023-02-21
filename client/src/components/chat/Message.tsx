interface Props {
    own: boolean
}

const Message = ({ own }:Props) => {
    return ( 
        <>
            {
                own ? 
                <div className="w-full flex flex-col items-end p-2">
                    <div className="rounded-full p-6 bg-primary -mb-6"></div>
                    <div className="flex flex-col items-end mr-16">
                        <div className="flex gap-x-4 items-center text-slate-800/60">
                            <p className="text-xs">15:33 PM</p>
                            <h2 className="font-semibold text-slate-800/90">Juan</h2>
                        </div>
                        <div className="bg-primary py-2 px-4 rounded-lg rounded-tr-none w-fit h-fit text-white mt-2 shadow-sm">
                            Soy un mensaje
                        </div>
                    </div>
                </div>
                :
                <div className="w-full flex flex-col items-start p-2">
                    <div className="rounded-full p-6 bg-primary -mb-9"></div>
                    <div className="ml-16">
                        <div className="flex gap-x-4 items-center text-slate-800/60">
                            <h2 className="font-semibold text-slate-800/90">Juan</h2>
                            <p className="text-xs">15:33 PM</p>
                        </div>
                        <div className="bg-white py-2 px-4 rounded-lg rounded-tl-none shadow-sm w-fit h-fit text-slate-800/80 mt-2 ">
                            Soy un mensaje
                        </div>
                    </div>
                </div>
            }
        </>
     );
}
 
export default Message;