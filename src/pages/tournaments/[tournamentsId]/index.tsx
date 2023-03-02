import EditTournament from "components/containers/EditTournament/EditTournament";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import TournamentHeader from "components/elements/TournamentHeader/TournamentHeader";
import useRedirect from "hooks/useRedirect";
import useTeams from "hooks/useTeams";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";

const Tournament: NextPage = () => {
  const { redirectToPath } = useRedirect();
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

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TournamentHeader tournament={tournament?.tournament} />
        <div className="flex w-full justify-end">
          <EditTournament />
        </div>
      </div>
      <GroupCardContainer participants={participant?.participants || []} />
    </>
  );
};

export default Tournament;
