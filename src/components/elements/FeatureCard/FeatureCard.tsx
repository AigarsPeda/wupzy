import { type FC, type ReactNode } from "react";
import GradientLine from "~/components/elements/GradientLine/GradientLine";

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  explanation: string;
}

// bg-gradient-to-r from-gray-800 to-gray-900

const FeatureCard: FC<FeatureCardProps> = ({ title, icon, explanation }) => {
  return (
    <div className="shadow-zinc-950/45 justify-between rounded-xl bg-zinc-950  p-6 text-white shadow-xl md:flex">
      <div className="mb-4 w-full">
        <div>
          <h4 className="text-lg font-normal tracking-wider text-gray-100">
            {title}
          </h4>
          <GradientLine />
        </div>

        <p className="font-primary font-light tracking-wider text-gray-300">
          {explanation}
        </p>
      </div>
      <div className="md:ml-2">{icon}</div>
    </div>
  );
};

export default FeatureCard;
