import { signIn, useSession } from "next-auth/react";
import type { FC } from "react";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import useRedirect from "../../../hooks/useRedirect";

const CTASection: FC = () => {
  const { data: sessionData } = useSession();
  const { redirectToPath } = useRedirect();

  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold tracking-tight md:text-7xl">
          Create your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">
            Tournament
          </span>
        </h1>

        <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary font-medium text-gray-800 md:text-xl">
          With Wupzy, you can effortlessly save game scores, access past
          results, and stay updated on upcoming matches. Plus, our user-friendly
          platform allows you to easily share your game tables with fellow
          participants.
        </h2>
      </div>

      <GradientButton
        type="button"
        handleClick={() => {
          if (!sessionData) {
            void signIn();
            return;
          }
          void redirectToPath("/tournaments");
        }}
        title={sessionData ? "Your tournaments" : "Try it now"}
      />
    </div>
  );
};

export default CTASection;
