import { type PlayOffTeamType } from "~/types/playoff.types";
import classNames from "~/utils/classNames";

const PlayoffTeamSelect = ({
  team,
  isLast,
}: {
  isLast: boolean;
  team: PlayOffTeamType;
}) => {
  return (
    <div
      className={classNames(
        !isLast && "mb-2",
        "flex space-x-1 rounded bg-gray-200 px-2 py-2"
      )}
    >
      <p className="min-h-[1.2rem]">{team?.name || ""}</p>
      {/* <span>{team.score}</span> */}
    </div>
  );
};

export default PlayoffTeamSelect;
