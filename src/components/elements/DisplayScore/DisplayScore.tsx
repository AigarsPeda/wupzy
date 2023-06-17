import { type FC } from "react";
import classNames from "~/utils/classNames";

interface DisplayScoreProps {
  score: number;

  isWinner: boolean;
  isTextLeft?: boolean;
}

const DisplayScore: FC<DisplayScoreProps> = ({
  score,
  isWinner,
  isTextLeft,
}) => {
  return (
    <p
      className={classNames(
        isTextLeft ? "text-left" : "text-right",
        isWinner ? "text-gray-900" : "text-gray-900",
        "text-3xl"
      )}
    >
      {score}
    </p>
  );
};

export default DisplayScore;
