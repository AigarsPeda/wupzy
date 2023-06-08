import { motion } from "framer-motion";
import { type FC, type ReactNode } from "react";

const itemVariants = {
  initial: { x: "-100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

interface AddingToListAnimationLayoutProps {
  index: number;
  children: ReactNode;
}

const AddingToListAnimationLayout: FC<AddingToListAnimationLayoutProps> = ({
  index,
  children,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={itemVariants}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default AddingToListAnimationLayout;
