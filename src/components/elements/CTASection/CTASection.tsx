import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold md:text-7xl">
          Sign up and manage your tournaments with ease!
        </h1>
        <p className="mx-auto mb-5 mt-10 max-w-2xl font-primary text-gray-600 md:text-lg">
          Simplify tournament management.{" "}
          <span className="mr-1 text-gray-800">
            Our website automates the process of creating tournament tables,
            saving you time and effort,
          </span>{" "}
          so you can focus on playing the game rather than managing the
          tournament.
        </p>
      </div>
    </div>
  );
};

export default CTASection;
