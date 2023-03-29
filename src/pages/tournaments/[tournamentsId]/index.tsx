import EditTournamentContainer from "components/containers/EditTournamentContainer/EditTournamentContainer";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import Spinner from "components/elements/Spinner/Spinner";
import TournamentHeader from "components/elements/TournamentHeader/TournamentHeader";
import useRedirect from "hooks/useRedirect";
import useTournament from "hooks/useTournament";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tournament: NextPage = () => {
  const { query } = useRouter();
  const { redirectToPath } = useRedirect();
  const [tournamentId, setTournamentId] = useState("");
  const { tournamentError, isTournamentLoading, tournament } =
    useTournament(tournamentId);

  useEffect(() => {
    if (!query.tournamentsId || typeof query.tournamentsId !== "string") return;

    setTournamentId(query.tournamentsId);
  }, [query.tournamentsId]);

  useEffect(() => {
    if (
      !isTournamentLoading &&
      tournamentError?.data?.code === "UNAUTHORIZED"
    ) {
      redirectToPath("/login", window.location.pathname);
    }
  }, [tournamentError?.data?.code, isTournamentLoading, redirectToPath]);

  if (isTournamentLoading) {
    return <Spinner size="small" />;
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <TournamentHeader tournament={tournament?.tournament} />
        <div className="flex w-full justify-end">
          <EditTournamentContainer />
        </div>
      </div>
      {tournament && (
        <GroupCardContainer
          tournamentId={tournamentId}
          tournamentKind={tournament.tournament.type}
        />
      )}
    </>
  );
};

export default Tournament;
