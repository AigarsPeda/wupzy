import BracketsInput from "components/elements/BracketsInput/BracketsInput";
import cratePlayoffInputMap from "components/elements/BracketsInput/utils/cratePlayoffInputMap";
import type { GameType } from "components/elements/CreatePlayOffModal/utils/util.types";
import Spinner from "components/elements/Spinner/Spinner";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import createPlayoffMap from "utils/createPlayoffMap";

const PlayOffPage: NextPage = () => {
  const { query } = useRouter();
  const { redirectToPath } = useRedirect();
  const [tournamentId, setTournamentId] = useState("");
  const [brackets, setBrackets] = useState<Map<string, GameType[]>>(new Map());
  const { data, error, isFetching, isLoading } =
    api.teamsTournaments.getPlayoffGames.useQuery(
      { tournamentId },
      {
        suspense: false,
        retry: 2,
      }
    );

  useEffect(() => {
    if (!query.tournamentsId || typeof query.tournamentsId !== "string") return;
    setTournamentId(query.tournamentsId);
  }, [query.tournamentsId]);

  useEffect(() => {
    if (!isLoading && error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [redirectToPath, error?.data?.code, isLoading]);

  useEffect(() => {
    if (!data?.games) return;

    const gameMap = createPlayoffMap(data.games);
    console.log(gameMap);
    const { playoffMap } = cratePlayoffInputMap(gameMap);

    console.log("playoffMap -->", playoffMap);

    setBrackets(playoffMap);
  }, [isLoading, data]);

  if (isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <GridLayout minWith="320" isGap>
      <BracketsInput brackets={[...brackets]} />
    </GridLayout>
  );
};

export default PlayOffPage;
