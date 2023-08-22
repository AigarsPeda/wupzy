import { type FC, type ReactNode } from "react";
import GradientLine from "~/components/elements/GradientLine/GradientLine";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  explanation: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, icon, explanation }) => {
  return (
    <div className="shadow-black/45 justify-between rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white shadow-2xl md:flex">
      <div className="mb-4 w-full">
        <div>
          <h4 className="text-lg font-normal tracking-wider">{title}</h4>
          <GradientLine />
          {/* <div className="my-2 h-0.5 w-full rounded-lg bg-gradient-to-r from-pink-500 to-red-500 md:w-[50%]" /> */}
        </div>

        <p className="font-primary font-light tracking-wider text-gray-200">
          {explanation}
        </p>
      </div>
      <div className="md:ml-2">{icon}</div>
    </div>
  );
};

export default FeatureCard;
