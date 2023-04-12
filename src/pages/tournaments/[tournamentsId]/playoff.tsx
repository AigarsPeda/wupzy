import Playoffs from "components/containers/Playoffs/Playoffs";
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

  return <Playoffs tournamentId={tournamentId} />;
};

export default PlayOffPage;
