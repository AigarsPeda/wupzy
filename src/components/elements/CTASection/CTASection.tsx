import type { FC } from "react";
import Highlighter from "react-highlight-words";

const CTASection: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <div>
        <h1 className="max-w-4xl font-primary text-5xl font-extrabold md:text-7xl">
          Sign up and manage your tournaments with ease!
        </h1>
        {/* <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary text-gray-600 md:text-lg">
          Simplify tournament management.{" "}
          <span className="mr-1 text-gray-800">
            Our website automates the process of creating tournament tables,
            saving you time and effort,
          </span>{" "}
          so you can focus on playing the game rather than managing the
          tournament.
        </h2> */}

        <h2 className="mx-auto mb-5 mt-10 max-w-2xl font-primary text-gray-600 md:text-lg">
          <Highlighter
            // className="mx-auto mb-5 mt-10 max-w-2xl font-primary text-gray-600 md:text-lg"
            highlightClassName="highlightLine px-1 py-0.5"
            searchWords={[
              "Our website automates the process of creating tournament tables, saving you time and effort",
            ]}
            autoEscape={true}
            textToHighlight="Simplify tournament management. Our website automates the process of creating tournament tables,
                          saving you time and effort, so you can focus on playing the game rather than managing the
                          tournament."
          />
        </h2>
      </div>
    </div>
  );
};

export default CTASection;
