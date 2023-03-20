import { motion } from "framer-motion";

interface Props {
    children: JSX.Element | JSX.Element[],
    className?:string
}

const AnimatedShowUp = ({ children, className }:Props) => {
    return ( 
        <motion.div
            initial={{ rotate:320, scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >
        {
            children
        }
        </motion.div>
    );
}
 
export default AnimatedShowUp;