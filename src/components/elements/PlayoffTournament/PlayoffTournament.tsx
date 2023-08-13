import { useEffect, useState, type FC } from "react";
import PlayoffTeamScore from "~/components/elements/PlayoffTeamScore/PlayoffTeamScore";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import {
  PlayoffGameSchema,
  type PlayGameType,
  type PlayoffMapType,
} from "~/types/playoff.types";
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

  const updateTeamsScore = (teamId: string, score: number) => {
    const newPlayoffTree: [number, PlayGameType[]][] = [...playoffTree].map(
      ([key, value]) => {
        return [
          key,
          value.map((game) => {
            const newTeams = game.teams.map((team) => {
              if (team.id === teamId) {
                return {
                  ...team,
                  score,
                };
              }

              return team;
            });

            return {
              ...game,
              teams: newTeams,
            };
          }),
        ];
      }
    );

    setPlayoffTree(new Map(newPlayoffTree));
  };

  useEffect(() => {
    if (!data?.playoffGames) {
      return;
    }

    const validatedPlayoffGames = PlayoffGameSchema.array().parse(
      data?.playoffGames
    );

    setPlayoffTree(organizePlayoffGames(validatedPlayoffGames));
  }, [data]);

  return (
    <div>
      <PlayoffsTree
        playoffTree={playoffTree}
        displayTeamsComponent={(team, isLast) => {
          console.log("team --->", team);
          return (
            <PlayoffTeamScore
              team={team}
              isLast={isLast}
              updateTeamsScore={updateTeamsScore}
            />
          );
        }}
      />
    </div>
  );
};

export default PlayoffTournament;
