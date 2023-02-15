import Logo from "../../assets/logo.png"

const SideMenu = () => {
    return ( 
        <div className="h-full flex flex-col justify-between items-center w-24">
            <button className="mt-12">
                <img src={Logo} width={30} className="hover:drop-shadow-xl"/>
            </button>
            <div className="flex flex-col gap-10">
                <div className="p-2 bg-slate-200"></div>
                <div className="p-2 bg-slate-200"></div>
                <div className="p-2 bg-slate-200"></div>
                <div className="p-2 bg-slate-200"></div>
                <div className="p-2 bg-slate-200"></div>
                <div className="p-2 bg-slate-200"></div>
                <div className="p-2 bg-slate-200"></div>
            </div>
            <div className="flex flex-col mb-12">
                <div className="p-4 rounded-full bg-primary"></div>
            </div>
        </div>
     );
}
 
export default SideMenu;