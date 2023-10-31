import { FC } from "react";
import classNames from "~/utils/classNames";

interface DisplayCreditsProps {
  credits: number | undefined;
}

const DisplayCredits: FC<DisplayCreditsProps> = ({ credits }) => {
  const getCreditsColor = () => {
    if (!credits) return "text-white";

    if (credits >= 75) {
      return "god";
    }
    if (credits < 75 && credits > 17) {
      return "low";
    }
    if (credits <= 17) {
      return "danger-low";
    }
  };

  return (
    <div>
      <p className="text-xs">
        <span className="text-gray-500">Credits:</span>
        <span
          className={classNames(
            getCreditsColor() === "god" && "text-green-500",
            getCreditsColor() === "low" && "text-yellow-500",
            getCreditsColor() === "danger-low" && "text-red-500",
            "ml-2 font-bold tracking-wider"
          )}
        >
          {credits}
        </span>
      </p>
    </div>
  );
};

export default DisplayCredits;
