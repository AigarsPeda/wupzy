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
  const { data: games } = api.tournaments.getTournamentGames.useQuery({
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

        if (!game.winnerId && !gamesOfInterest[group]) {
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

  // useEffect(() => {
  //   if (!games) return;

  //   createGamesOfInterest(games.games);
  // }, [games]);

  if (isParticipantsLoading) return <p>Loading...</p>;

  return (
    <div>
      {/* {createActiveGame(games?.games)} */}
      {/* <GridLayout minWith="700" isGap> */}
      {participants &&
        [...participants.participants].map(([group, value]) => {
          return (
            <GroupCard
              key={group}
              group={group}
              teams={value}
              createGamesOfInterest={createGamesOfInterest(games?.games || [])}
            />
          );
        })}
      {/* </GridLayout> */}
    </div>
  );
};

export default GroupCardContainer;
