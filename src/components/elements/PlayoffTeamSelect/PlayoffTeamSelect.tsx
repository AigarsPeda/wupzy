import { type FC } from "react";
import { type PlayOffTeamType } from "~/types/playoff.types";
import classNames from "~/utils/classNames";

export interface PlayoffTeamSelectProps {
  isLast: boolean;
  team: PlayOffTeamType;
}

const PlayoffTeamSelect: FC<PlayoffTeamSelectProps> = ({ team, isLast }) => {
  return (
    <div
      className={classNames(
        !isLast && "mb-2",
        "flex space-x-1 rounded bg-gray-200 px-2 py-2"
      )}
    >
      <p className="min-h-[1.2rem]">{team?.name || ""}</p>
    </div>
  );
};

export default PlayoffTeamSelect;
