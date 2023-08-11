import { useEffect, useState, type FC } from "react";
import PlayoffTeamSelect from "~/components/elements/PlayoffTeamSelect/PlayoffTeamSelect";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import { type PlayoffMapType } from "~/types/playoff.types";
import { api } from "~/utils/api";

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
    const tree: PlayoffMapType = new Map();

    data?.playoffGames.forEach((game) => {
      const { round } = game;

      if (!tree.has(round)) {
        tree.set(round, []);
      }

      tree.get(round)?.push({
        id: game.id,
        match: game.match,
        round: game.round,

        teams: [
          {
            score: 0,
            id: game.teamOne?.id || "",
            name: game.teamOne?.name || "n/a",
          },
          {
            score: 0,
            id: game.teamTwo?.id || "",
            name: game.teamTwo?.name || "n/a",
          },
        ],
      });
    });

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
