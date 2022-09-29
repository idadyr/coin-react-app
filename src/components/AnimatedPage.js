import { motion } from "framer-motion"; 

const animations = { // animation variants
  initial: { opacity: 0, scale:0.7},
  animate: { opacity: 1, x: 0,scale:1},
  exit: { opacity: 0, x: -100 },
  enter: { opacity: 0, x: 100 },
};
   
const AnimatedPage = ({ children }) => {
  return (
    <motion.div //motion.div is a wrapper for all the components that need to be animated
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;