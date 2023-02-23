import EditTournament from "components/containers/EditTournament/EditTournament";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import TournamentHeader from "components/elements/TournamentHeader/TournamentHeader";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";

const Tournament: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const [tournamentId, setTournamentId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: teams, isLoading: isTeamsLoading } =
    api.teams.getTournamentTeams.useQuery(
      {
        id: tournamentId,
      },
      {
        // fetch on window focus only if the modal is not open
        refetchOnWindowFocus: !isModalOpen,
      }
    );

  const {
    error,
    isLoading,
    data: tournament,
  } = api.tournaments.getTournament.useQuery(
    {
      id: tournamentId,
    },
    {
      // fetch the tournament data only if the tournamentId is
      enabled: !!tournamentId,
    }
  );

  useEffect(() => {
    if (
      !router.query.tournamentsId ||
      typeof router.query.tournamentsId !== "string"
    ) {
      return;
    }

    setTournamentId(router.query.tournamentsId);
  }, [router.query.tournamentsId]);

  useEffect(() => {
    if (!isTeamsLoading && !isLoading && error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [error?.data?.code, isLoading, isTeamsLoading, redirectToPath, router]);

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TournamentHeader tournament={tournament?.tournament} />
        <div>
          <EditTournament
            isModalOpen={isModalOpen}
            teams={teams?.teams || []}
            handleModalClicks={setIsModalOpen}
          />
        </div>
        <div className="w-40"></div>
      </div>
      <GroupCardContainer teams={teams?.teams || []} />
    </>
  );
};

export default Tournament;
