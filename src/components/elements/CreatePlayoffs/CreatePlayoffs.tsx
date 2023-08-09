import { type FC } from "react";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import { type PlayGameType, type PlayOffTeamType } from "~/types/playoff.types";
import classNames from "~/utils/classNames";
import genUniqueId from "~/utils/genUniqueId";

interface CreatePlayoffsProps {
  playoffTree: Map<number, PlayGameType[]> | never[];
}

// PlayOffTeamType

const Something = ({
  team,
  isLast,
}: {
  isLast: boolean;
  team: PlayOffTeamType;
}) => {
  return (
    <div
      // key={genUniqueId()}
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

const CreatePlayoffs: FC<CreatePlayoffsProps> = ({ playoffTree }) => {
  return (
    <PlayoffsTree playoffTree={playoffTree} displayTeamsComponent={Something} />
  );
};

export default CreatePlayoffs;
