import { motion } from "framer-motion";
import { type FC, type ReactNode } from "react";

const itemVariants = {
  initial: { x: "-100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

interface AddingToListAnimationLayoutProps {
  index: number;
  isFlex?: boolean;
  zIndex?: number;
  children: ReactNode;
}

const AddingToListAnimationLayout: FC<AddingToListAnimationLayoutProps> = ({
  index,
  isFlex,
  zIndex,
  children,
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={itemVariants}
      style={{ zIndex: zIndex || 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={isFlex ? " flex w-full items-center justify-between" : ""}
    >
      {children}
    </motion.div>
  );
};

export default AddingToListAnimationLayout;
