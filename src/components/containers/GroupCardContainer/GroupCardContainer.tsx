import GroupCard from "components/elements/GroupCard/GroupCard";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import { api } from "utils/api";
import createGamesOfInterest from "utils/createGamesOfInterest";
import getGameCountPerGroup from "utils/getGameCountPerGroup";

interface GroupCardContainerProps {
  tournamentId: string;
}

const GroupCardContainer: FC<GroupCardContainerProps> = ({ tournamentId }) => {
  const { participants, refetchParticipants, isParticipantsLoading } =
    useParticipants(tournamentId);
  const { data: games, refetch: refetchGames } =
    api.tournaments.getTournamentGames.useQuery({ tournamentId });

  if (isParticipantsLoading) return <p>Loading...</p>;

  return (
    <div>
      {participants &&
        [...participants.participants].map(([group, participants]) => {
          return (
            <GroupCard
              key={group}
              group={group}
              teams={participants}
              tournamentId={tournamentId}
              totalGames={getGameCountPerGroup(games?.games || [])}
              gamesOfInterest={createGamesOfInterest(games?.games || [])}
              refetchGames={() => {
                refetchGames().catch((err) => console.error(err));
                refetchParticipants().catch((err) => console.error(err));
              }}
            />
          );
        })}
    </div>
  );
};

export default GroupCardContainer;
