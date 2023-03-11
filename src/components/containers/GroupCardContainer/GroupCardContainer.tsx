import GroupCard from "components/elements/GroupCard/GroupCard";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import type { GamesType } from "types/team.types";
import { api } from "utils/api";
import createGamesMap from "utils/createGamesMap";

export type ActivesGameType = {
  [key: string]: {
    "0": GamesType;
    "1": GamesType | undefined;
    "-1": GamesType | undefined;
  };
};

interface GroupCardContainerProps {
  tournamentId: string;
}

const GroupCardContainer: FC<GroupCardContainerProps> = ({ tournamentId }) => {
  const { participants, isParticipantsLoading } = useParticipants(tournamentId);
  const { data: games, refetch } = api.tournaments.getTournamentGames.useQuery({
    id: tournamentId,
  });

  const createGamesOfInterest = (games: GamesType[]) => {
    const gamesMap = createGamesMap(games);

    const gamesOfInterest: ActivesGameType = {};

    gamesMap.forEach((games, group) => {
      if (!games) return;

      for (let i = 0; i < games.length; i++) {
        const game = games[i];

        if (!game) continue;

        if (game.winnerIds?.length === 0 && !gamesOfInterest[group]) {
          gamesOfInterest[group] = {
            "0": game,
            "1": games[i + 1] || undefined,
            "-1": games[i - 1] || undefined,
          };
        }
      }
    });

    return gamesOfInterest;
  };

  // count total games in group and pass it to GroupCard
  const getGameCountPerGroup = (games: GamesType[]) => {
    const gamesMap = createGamesMap(games);
    const totalGames: {
      [key: string]: number;
    } = {};

    gamesMap.forEach((games, group) => {
      if (!games) return;

      totalGames[group] = games.length;
    });

    return totalGames;
  };

  if (isParticipantsLoading) return <p>Loading...</p>;

  return (
    <div>
      {console.log("games", games)}
      {participants &&
        [...participants.participants].map(([group, value]) => {
          return (
            <GroupCard
              key={group}
              group={group}
              teams={value}
              refetchGames={() => {
                refetch().catch((err) => console.error(err));
              }}
              totalGames={getGameCountPerGroup(games?.games || [])}
              gamesOfInterest={createGamesOfInterest(games?.games || [])}
            />
          );
        })}
    </div>
  );
};

export default GroupCardContainer;
