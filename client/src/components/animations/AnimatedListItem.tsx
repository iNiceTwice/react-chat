import { motion } from "framer-motion";

interface Props {
    children: JSX.Element | JSX.Element[],
    className?:string,
    key?:string
}

const AnimatedListItem = ({ children, className, key }:Props) => {

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return ( 
        <motion.li key={key} className={className} variants={item}>
            {
                children
            }
        </motion.li>
     );
}
 
export default AnimatedListItem;