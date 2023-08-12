import { useEffect, useState, type FC } from "react";
import PlayoffTeamSelect from "~/components/elements/PlayoffTeamSelect/PlayoffTeamSelect";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import { PlayoffGameSchema, type PlayoffMapType } from "~/types/playoff.types";
import { api } from "~/utils/api";
import organizePlayoffGames from "~/utils/organizePlayoffGames";

interface PlayoffTournamentProps {
  tournamentId: string | undefined;
}

const PlayoffTournament: FC<PlayoffTournamentProps> = ({ tournamentId }) => {
  const [playoffTree, setPlayoffTree] = useState<PlayoffMapType>(new Map());
  const { data } = api.playoffs.getPlayoffGames.useQuery(
    { tournamentId: tournamentId || "" },
    { enabled: Boolean(tournamentId) }
  );

  useEffect(() => {
    if (!data?.playoffGames) {
      return;
    }

    const validatedPlayoffGames = PlayoffGameSchema.array().parse(
      data?.playoffGames
    );

    const tree = organizePlayoffGames(validatedPlayoffGames);

    setPlayoffTree(tree);
  }, [data]);

  return (
    <div>
      <PlayoffsTree
        playoffTree={playoffTree}
        displayTeamsComponent={PlayoffTeamSelect}
      />
    </div>
  );
};

export default PlayoffTournament;
