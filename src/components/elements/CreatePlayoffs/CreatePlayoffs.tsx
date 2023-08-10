import { type FC } from "react";
import PlayoffTeamSelect from "~/components/elements/PlayoffTeamSelect/PlayoffTeamSelect";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import { type PlayGameType } from "~/types/playoff.types";

interface CreatePlayoffsProps {
  playoffTree: Map<number, PlayGameType[]> | never[];
}

const CreatePlayoffs: FC<CreatePlayoffsProps> = ({ playoffTree }) => {
  return (
    <PlayoffsTree
      playoffTree={playoffTree}
      displayTeamsComponent={PlayoffTeamSelect}
    />
  );
};

export default CreatePlayoffs;
