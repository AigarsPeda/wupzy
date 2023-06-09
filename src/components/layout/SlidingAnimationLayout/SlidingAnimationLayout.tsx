import { motion } from "framer-motion";
import { type FC, type ReactNode } from "react";

interface SlidingAnimationLayoutProps {
  children: ReactNode;
  isLeftSide?: boolean;
}

const SlidingAnimationLayout: FC<SlidingAnimationLayoutProps> = ({
  children,
  isLeftSide = false,
}) => {
  const getSides = () => {
    return isLeftSide ? "-100%" : "100%";
  };

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: getSides() }}
      transition={{ duration: 0.3 }}
      exit={{ x: 0, opacity: 0, position: "absolute" }}
      className="bottom-0 left-0 right-0 top-0 bg-white"
    >
      {children}
    </motion.div>
  );
};

export default SlidingAnimationLayout;
