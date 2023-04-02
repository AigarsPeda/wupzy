import { useAutoAnimate } from "@formkit/auto-animate/react";
import GroupCard from "components/elements/GroupCard/GroupCard";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import type { TournamentTypeType } from "types/tournament.types";
import { api } from "utils/api";
import createGamesOfInterest from "utils/createGamesOfInterest";
import getGameCountPerGroup from "utils/getGameCountPerGroup";

interface GroupCardContainerProps {
  tournamentId: string;
  tournamentKind: TournamentTypeType;
}

const GroupCardContainer: FC<GroupCardContainerProps> = ({
  tournamentId,
  tournamentKind,
}) => {
  const [parent] = useAutoAnimate();
  const { participants, refetchParticipants, isParticipantsLoading } =
    useParticipants(tournamentId);
  const { data: games, refetch: refetchGames } =
    api.tournaments.getAllTournamentGames.useQuery({ tournamentId });

  if (isParticipantsLoading) return <p>Loading...</p>;

  return (
    <div ref={parent}>
      {participants &&
        [...participants.participants].map(([group, participants]) => {
          return (
            <GroupCard
              key={group}
              group={group}
              participants={participants}
              tournamentId={tournamentId}
              tournamentKind={tournamentKind}
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
