import { AnimatePresence } from "framer-motion";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";

const SignupLinkCreate = () => {
  return (
    <AnimatePresence key="SignupLink">
      <SlidingAnimationLayout>
        <div className="border-b border-gray-900/10 pb-12">Sign up link</div>
      </SlidingAnimationLayout>
    </AnimatePresence>
  );
};

export default SignupLinkCreate;
