import { motion } from "framer-motion";

interface Props {
    children?: JSX.Element | JSX.Element[],
    className?:string
}

const AnimatedListContainer = ({ children }:Props) => {
    
    const container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    }

    return ( 
        <motion.ul variants={container} initial="hidden" animate="visible">
            {
                children
            }
        </motion.ul>
     );
}
 
export default AnimatedListContainer;