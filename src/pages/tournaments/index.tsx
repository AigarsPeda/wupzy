import Spinner from "components/elements/Spinner/Spinner";
import TournamentCard from "components/elements/TournamentCard/TournamentCard";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";

type GameType = {
  firstPair: string[];
  secondPair: string[];
};

const TournamentsPage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const res = api.tournaments.getAllTournaments.useQuery(undefined, {
    suspense: false,
    retry: 2,
  });

  const game = () => {
    // 5 player they need play in pairs with each other and every player plays with every other player once
    const players = ["A", "B", "C", "D", "E", "F"];
    const allPossiblePairs: string[][] = [];
    const games = new Set<GameType>();

    // Create all possible pairs
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const player1 = players[i];
        const player2 = players[j];
        if (!player1 || !player2) return;
        allPossiblePairs.push([player1, player2]);
      }
    }

    // Create a set of games
    for (let i = 0; i < allPossiblePairs.length; i++) {
      const firstPair = allPossiblePairs[i];

      if (!firstPair) return;

      // find next pair that doesn't have any of the players that are in firstPair
      for (let j = i + 1; j < allPossiblePairs.length; j++) {
        const secondPair = allPossiblePairs[j];

        if (!secondPair || !firstPair[0] || !firstPair[1]) return;

        if (
          !secondPair.includes(firstPair[0]) &&
          !secondPair.includes(firstPair[1])
        ) {
          games.add({ firstPair, secondPair });

          break;
        }
      }
    }

    games.forEach((game) => {
      console.log("game ---->", game.firstPair, game.secondPair);
    });

    console.log("games", games);
  };

  useEffect(() => {
    if (!res.isLoading && res.error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [redirectToPath, res.error?.data?.code, res.isLoading]);

  if (res.isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <GridLayout isGap>
      {res.data && res.data.tournaments.length > 0 ? (
        res.data.tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))
      ) : (
        <p>No tournaments</p>
      )}
    </GridLayout>
  );
};

export default TournamentsPage;
