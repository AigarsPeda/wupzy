import { motion } from "framer-motion";
import { type FC, type ReactNode } from "react";

interface SlidingAnimationLayoutProps {
  // isVisible: boolean;
  children: ReactNode;
  isLeftSide?: boolean;
}

const SlidingAnimationLayout: FC<SlidingAnimationLayoutProps> = ({
  children,
  // isVisible,
  isLeftSide = false,
}) => {
  const getSides = () => {
    return isLeftSide ? "-100%" : "100%";
  };

  return (
    <motion.div
      className="bottom-0 left-0 right-0 top-0 bg-white"
      initial={{ x: getSides() }}
      animate={{ x: 0 }}
      exit={{ x: 0, opacity: 0, position: "absolute" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default SlidingAnimationLayout;
