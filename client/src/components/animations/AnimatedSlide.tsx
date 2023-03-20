import { motion } from "framer-motion";

interface Props {
    children: JSX.Element | JSX.Element[],
    className?:string,
    start?:number,
    duration?:number,
    hidden?:number,
}

const AnimatedSlide = ({ children, className, start=-30, duration=0.5, hidden=0 }:Props) => {
    
    const item = {
        hidden: { x: start, opacity: hidden },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration
            }
        }
    }

    return ( 
        <motion.div className={className} initial="hidden" animate="visible" variants={item}>
            {
                children
            }
        </motion.div>
     );
}
 
export default AnimatedSlide;