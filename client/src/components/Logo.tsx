import ChatLogo from "../assets/logo.png"

const Logo = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)

    return ( 
        <div className="flex items-center justify-center">
            <img className="drop-shadow-lg w-28 lg:w-[12vw]" src={ ChatLogo } />
            <h1 className="font-bold text-5xl lg:text-6xl text-slate-800/90 dark:text-tertiary">Chat.io</h1>
        </div>
     );
}
 
export default Logo;