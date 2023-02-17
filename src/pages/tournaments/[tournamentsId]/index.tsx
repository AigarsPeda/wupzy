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
  const { data: teams } = api.teams.getTournamentTeams.useQuery({
    id: tournamentId,
  });
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
    console.log("tournamentId", tournamentId);
    console.log("router.pathname", router.query.tournamentsId);
  }, [router, tournamentId]);

  useEffect(() => {
    if (!isLoading && error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", true);
    }
  }, [error?.data?.code, isLoading, redirectToPath]);

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
      <div className="max-w-[16rem] rounded border-gray-100 bg-gray-100 p-4 shadow-lg">
        <p className="mb-3 text-sm text-gray-400">Teams:</p>
        {teams?.teams.map((team) => (
          <div key={team.id} className="my-2 flex justify-between border-b">
            <p>{team.name}</p>
            <p>{team.score}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tournament;
