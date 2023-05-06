import type { FC } from "react";
import { RoughNotation } from "react-rough-notation";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold md:text-7xl">
          Sign up and manage your tournaments with ease!
        </h1>

        <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary text-gray-600 md:text-lg">
          Simplify tournament management.
          <RoughNotation
            show
            multiline
            padding={1}
            strokeWidth={3}
            animate={false}
            color="#a855f7"
            type="highlight"
          >
            <span className="text-white">
              Our website automates the process of creating tournament tables,
              saving you time and effort,
            </span>
          </RoughNotation>{" "}
          saving you time and effort, so you can focus on playing the game
          rather than managing the tournament.
        </h2>
      </div>
    </div>
  );
};

export default CTASection;
