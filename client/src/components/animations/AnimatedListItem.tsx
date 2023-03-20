import { motion } from "framer-motion";

interface Props {
    children: JSX.Element | JSX.Element[],
    className?:string
}

const AnimatedListItem = ({ children, className }:Props) => {

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return ( 
        <motion.li className={className} variants={item}>
            {
                children
            }
        </motion.li>
     );
}
 
export default AnimatedListItem;