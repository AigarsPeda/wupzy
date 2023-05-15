import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold tracking-tight md:text-7xl">
          Sign up and create your game table today!
        </h1>

        <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary text-gray-800 md:text-xl">
          With Wupzy, you have the ability to create tournament tables for
          regular games and playoffs brackets. Additionally, you can save game
          scores, view past results and upcoming matches, and easily share your
          game table with other participants.
        </h2>
      </div>
    </div>
  );
};

export default CTASection;
