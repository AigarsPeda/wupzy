import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";

interface SignupLinkCreateProps {
  signupDescription: string;
  handleDescriptionChange: (description: string) => void;
}

const SignupLinkCreate: FC<SignupLinkCreateProps> = ({
  signupDescription,
  handleDescriptionChange,
}) => {
  // const [description, setDescription] = useState("");
  return (
    <AnimatePresence key="SignupLink">
      <SlidingAnimationLayout>
        {/* <div className="border-b border-gray-900/10 pb-12">Sign up link</div> */}
        {/* <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                Sign up link
              </div>
            </div>
          </div>
        </div> */}

        <fieldset className="mt-8">
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Description
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This description will be shown to the users when they sign up for
          </p>
          <div className="mt-6">
            <textarea
              className="h-32 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Place, date, time, etc."
              value={signupDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>
        </fieldset>
      </SlidingAnimationLayout>
    </AnimatePresence>
  );
};

export default SignupLinkCreate;
