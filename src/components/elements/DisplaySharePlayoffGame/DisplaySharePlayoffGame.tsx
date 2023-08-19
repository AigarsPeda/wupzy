import { type FC } from "react";
import classNames from "~/utils/classNames";

interface DisplaySharePlayoffGameProps {
  isLast: boolean;
  teamName: string;
  teamScore: number;
  isBothTeams: boolean;
}

const DisplaySharePlayoffGame: FC<DisplaySharePlayoffGameProps> = ({
  isLast,
  teamName,
  teamScore,
  isBothTeams,
}) => {
  return (
    <div className={classNames(!isLast && "mb-2")}>
      <div className="flex min-h-[3.7rem] min-w-[5rem] items-center justify-between gap-y-2 rounded bg-gray-200 px-2 py-2">
        <p>{teamName}</p>
        {isBothTeams && (
          <p className="text-center text-3xl font-bold text-gray-900">
            {teamScore}
          </p>
        )}
      </div>
    </div>
  );
};

export default DisplaySharePlayoffGame;
