import Playoffs from "components/containers/Playoffs/Playoffs";
import PageHead from "components/elements/PageHead/PageHead";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PlayOffPage: NextPage = () => {
  const { query } = useRouter();
  const [tournamentId, setTournamentId] = useState("");

  useEffect(() => {
    if (!query.tournamentsId || typeof query.tournamentsId !== "string") return;
    setTournamentId(query.tournamentsId);
  }, [query.tournamentsId]);

  return (
    <>
      <PageHead
        title="Wupzy | Playoffs"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <Playoffs tournamentId={tournamentId} />{" "}
    </>
  );
};

export default PlayOffPage;
