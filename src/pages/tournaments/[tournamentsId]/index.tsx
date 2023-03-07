import EditTournament from "components/containers/EditTournament/EditTournament";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import TournamentHeader from "components/elements/TournamentHeader/TournamentHeader";
import useRedirect from "hooks/useRedirect";
import useTournament from "hooks/useTournament";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";

const Tournament: NextPage = () => {
  const { query } = useRouter();
  const { redirectToPath } = useRedirect();
  const [tournamentId, setTournamentId] = useState<string>("");
  const { isTournamentLoading, tournament } = useTournament(tournamentId);

  const { data: games, error: gameError } =
    api.tournaments.getTournamentGames.useQuery({
      id: tournamentId,
    });

  useEffect(() => {
    if (!query.tournamentsId || typeof query.tournamentsId !== "string") return;

    setTournamentId(query.tournamentsId);
  }, [query.tournamentsId]);

  useEffect(() => {
    if (!isTournamentLoading && gameError?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [gameError?.data?.code, isTournamentLoading, redirectToPath]);

  if (isTournamentLoading) {
    return <Spinner size="small" />;
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        {console.log("games from API ---->", games?.games)}
        <TournamentHeader tournament={tournament?.tournament} />
        <div className="flex w-full justify-end">
          <EditTournament />
        </div>
      </div>
      <GroupCardContainer tournamentId={tournamentId} />
    </>
  );
};

export default Tournament;
