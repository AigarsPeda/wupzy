import EditTournament from "components/containers/EditTournament/EditTournament";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import TournamentHeader from "components/elements/TournamentHeader/TournamentHeader";
import useRedirect from "hooks/useRedirect";
import useTeams from "hooks/useTeams";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { TeamType } from "types/team.types";
import { api } from "utils/api";

const Tournament: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const { teams, teamsError, tournamentId, isTeamsLoading } = useTeams();
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
      !isTeamsLoading &&
      teamsError?.data?.code === "UNAUTHORIZED"
    ) {
      redirectToPath("/login", window.location.pathname);
    }
  }, [
    router,
    isLoading,
    isTeamsLoading,
    redirectToPath,
    teamsError?.data?.code,
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
      <GroupCardContainer teams={teams?.teams || []} />
    </>
  );
};

export default Tournament;
