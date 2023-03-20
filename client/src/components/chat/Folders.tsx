import AnimatedSlide from "../animations/AnimatedSlide";
import Menu from "./Menu";

const Folders = () => {
    return ( 
        <div className="w-full p-5">
            <div className="flex justify-between w-full">
                <AnimatedSlide>
                    <h2 className="text-2xl py-4 text-primary font-bold">Folders</h2>
                </AnimatedSlide>
                <Menu/>
            </div>
            <div className="flex justify-center w-full">
                <h3 className='pt-32 text-2xl font-semibold text-slate-800/80 dark:text-slate-200'>Coming soon...</h3>
            </div>
        </div>
    );
}
 
export default Folders;