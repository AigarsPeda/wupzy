import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="font-primary max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
          Create your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-7xl font-extrabold text-transparent">
            tournament{" "}
          </span>
          today!
        </h1>

        <h2 className="font-primary mx-auto mb-5 mt-10 max-w-2xl text-gray-800 md:text-xl">
          With Wupzy, you can effortlessly save game scores, access past
          results, and stay updated on upcoming matches. Plus, our user-friendly
          platform allows you to easily share your game tables with fellow
          participants.
        </h2>
      </div>
    </div>
  );
};

export default CTASection;
