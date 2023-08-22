import { type FC } from "react";

const GradientLine: FC = () => {
  return (
    <div className="my-2 h-0.5 w-full rounded-lg bg-gradient-to-r from-pink-500 to-red-500 md:w-[50%]" />
  );
};

export default GradientLine;
