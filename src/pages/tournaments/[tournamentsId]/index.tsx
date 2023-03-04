import EditTournament from "components/containers/EditTournament/EditTournament";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import TournamentHeader from "components/elements/TournamentHeader/TournamentHeader";
import useRedirect from "hooks/useRedirect";
import useTeams from "hooks/useTeams";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { api } from "utils/api";

const Tournament: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { participant, participantError, tournamentId, isParticipantLoading } =
    useTeams();
  const { isLoading, data: tournament } =
    api.tournaments.getTournament.useQuery(
      {
        id: tournamentId,
      },
      {
        // fetch the tournament only if the tournamentId is set
        enabled: !!tournamentId,
      }
    );

  const { data: games } = api.tournaments.getTournamentGames.useQuery({
    id: tournamentId,
  });

  useEffect(() => {
    if (
      !isLoading &&
      !isParticipantLoading &&
      participantError?.data?.code === "UNAUTHORIZED"
    ) {
      redirectToPath("/login", window.location.pathname);
    }
  }, [
    isLoading,
    redirectToPath,
    isParticipantLoading,
    participantError?.data?.code,
  ]);

  const handleModalClick = (b: boolean) => {
    setIsModalOpen(b);
  };

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        {console.log("games from API ---->", games?.games)}
        <TournamentHeader tournament={tournament?.tournament} />
        <div className="flex w-full justify-end">
          <EditTournament
            isModalOpen={isModalOpen}
            handleModalClick={handleModalClick}
          />
        </div>
      </div>
      <GroupCardContainer participants={participant?.participants || []} />
    </>
  );
};

export default Tournament;
