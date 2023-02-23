interface ContactProps {
    username: string,
    img: string,
    online?: boolean,
    lastMessage?: string
}

const Contact = ({username, online, img, lastMessage }:ContactProps) => {
    return ( 
        <>
            <button className="w-full flex items-center py-6 gap-4 hover:bg-terceary p-2 rounded-md">
                <div className="relative p-1 rounded-full w-fit bg-primary">
                    <img src={ img } alt={username} className="w-10 h-10"/>
                    <div className="absolute border-2 border-secondary p-1 bg-green-500 rounded-full right-0 bottom-0"></div>
                </div>
                <div className="flex flex-col gap-[0.5]">
                    <h4 className="text-slate-800/80 font-bold w-full text-start">{ username }</h4>
                    <p className="text-xs font-medium text-slate-800/40 w-full text-start">Hola! como estas ?</p>
                </div>
            </button>
        </>
     );
}
 
export default Contact;