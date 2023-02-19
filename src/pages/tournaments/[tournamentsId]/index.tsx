import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import formatDate from "utils/formatDate";

const Tournament: NextPage = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const [tournamentId, setTournamentId] = useState("");
  const { data: teams, isLoading: isTeamsLoading } =
    api.teams.getTournamentTeams.useQuery(
      {
        id: tournamentId,
      },
      {
        refetchOnWindowFocus: true,
      }
    );
  const {
    error,
    isLoading,
    data: tournament,
  } = api.tournaments.getTournament.useQuery({
    id: tournamentId,
  });

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
      <div className="mb-4">
        <p className="text-2xl">{tournament?.tournament.name}</p>
        <p className="text-sm text-gray-400">
          {formatDate(tournament?.tournament.updatedAt)}
        </p>
      </div>
      <GroupCardContainer teams={teams?.teams || []} />
    </>
  );
};

export default Tournament;
