import { type FC } from "react";
import classNames from "~/utils/classNames";

interface DisplayScoreProps {
  score: number;
  isWinner: boolean;
}

const DisplayScore: FC<DisplayScoreProps> = ({ score, isWinner }) => {
  return (
    <p
      className={classNames(
        isWinner ? "text-gray-900" : "text-gray-900",
        "text-2xl"
      )}
    >
      {score}
    </p>
  );
};

export default DisplayScore;
