import type { FC } from "react";

const ExplanationsSection: FC = () => {
  return (
    <div className="mx-auto mt-20 flex max-w-3xl">
      <p className="font-primary text-2xl">
        <span className="mr-2 whitespace-nowrap">What is wupzy?</span>
        <span className="text-gray-600 md:text-lg">
          {" "}
          Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks.
        </span>{" "}
      </p>
    </div>
  );
};

export default ExplanationsSection;
