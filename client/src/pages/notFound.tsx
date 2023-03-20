import { useEffect } from "react";
import { CiSquareChevLeft } from "react-icons/ci";
import { Link } from "react-router-dom";
import DefaultScreen from "../components/DefaultScreen";

const NotFound = () => {

  const { theme } = JSON.parse(localStorage.getItem("chatUser") as string) 

  useEffect(() => {
    theme === "dark" ?
    document.querySelector("html")?.classList.add("dark")
    :
    document.querySelector("html")?.classList.remove("dark")

  }, []);

    return ( 
        <div className="w-full h-screen bg-tertiary dark:bg-tertiary_dark flex items-center justify-center">
            <DefaultScreen>
                <div className="flex justify-center gap-4 text-3xl w-full mt-4 text-slate-800/90 dark:text-tertiary">
                    <span className="font-semibold">Oops!</span> 
                    <span>Page not found.</span> 
                </div>
                <Link to="/" className="mt-8 flex items-center justify-center gap-4 text-white text-lg p-3 w-full bg-primary rounded-full hover:bg-primary/90 transition-colors">
                    <CiSquareChevLeft size={25} />
                    Back to homepage
                </Link>
            </DefaultScreen>
        </div>
     );
}
 
export default NotFound;