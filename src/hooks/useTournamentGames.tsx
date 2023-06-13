import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTournament from "~/hooks/useTournament";
import { type GameType } from "~/types/tournament.types";
import {
  type HandleScoreSaveTypeArgs,
  type HandleScoreChangTypeArgs,
} from "~/types/utils.types";

const useTournamentGames = () => {
  const router = useRouter();
  const [games, setGames] = useState<GameType[]>([]);
  const { isLoading, tournament, setTournamentId } = useTournament();

  const handleScoreChange = ({
    num,
    gameId,
    teamId,
  }: HandleScoreChangTypeArgs) => {
    const newGames = games.map((game) => {
      if (game.id === gameId) {
        if (game.teamOneId === teamId) {
          return {
            ...game,
            teamOneScore: num,
          };
        }
        if (game.teamTwoId === teamId) {
          return {
            ...game,
            teamTwoScore: num,
          };
        }
      }
      return game;
    });

    setGames(newGames);
  };

  const handleScoreSave = ({ game }: HandleScoreSaveTypeArgs) => {
    // TODO: Create json file with games set
    // TODO: save score to db
    console.log("game", game);
  };

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  useEffect(() => {
    if (tournament?.games) {
      setGames(tournament.games);
    }
  }, [tournament?.games]);

  return {
    games,
    isLoading,
    handleScoreSave,
    handleScoreChange,
    tournamentName: tournament?.name,
  };
};

export default useTournamentGames;
