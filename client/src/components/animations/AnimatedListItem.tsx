import { motion } from "framer-motion";

interface Props {
    children?: JSX.Element | JSX.Element[]
}

const AnimatedListItem = ({ children }:Props) => {

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return ( 
        <motion.li variants={item}>
            {
                children
            }
        </motion.li>
     );
}
 
export default AnimatedListItem;