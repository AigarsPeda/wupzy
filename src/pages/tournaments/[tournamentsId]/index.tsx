import CreatePlayOff from "components/containers/CreatePlayOff/CreatePlayOff";
import EditTournamentContainer from "components/containers/EditTournamentContainer/EditTournamentContainer";
import GroupCardContainer from "components/containers/GroupCardContainer/GroupCardContainer";
import CreateShareLink from "components/elements/CreateShareLink/CreateShareLink";
import PageHead from "components/elements/PageHead/PageHead";
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
      <PageHead
        title="Wupzy | Tournament"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <div className="mb-4 flex justify-between">
        <TournamentHeader tournament={tournament?.tournament} />
        {tournament && (
          <div className="flex">
            <CreatePlayOff
              tournamentId={tournamentId}
              isPlayoff={Boolean(tournament.tournament.isPlayoff)}
              tournamentType={tournament.tournament.type ?? "TEAMS"}
            />

            <CreateShareLink tournament={tournament.tournament} />

            <EditTournamentContainer
              tournamentId={tournamentId}
              isPlayoff={Boolean(tournament?.tournament.isPlayoff)}
            />
          </div>
        )}
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
