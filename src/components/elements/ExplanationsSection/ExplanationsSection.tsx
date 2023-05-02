import type { FC } from "react";

const ExplanationsSection: FC = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-3xl md:mt-20">
      <p className="font-primary">
        <span className="mr-2 whitespace-nowrap font-bold">What is wupzy?</span>
        <span className="text-gray-600">
          {" "}
          Wupzy is a powerful platform that lets you effortlessly{" "}
          <mark className="highlight">create tournament tables,</mark> save game
          scores, view real-time results, and share them with all participants
          in just a few clicks.
        </span>{" "}
      </p>
    </div>
  );
};

export default ExplanationsSection;
