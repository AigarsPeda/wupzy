import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTournament from "~/hooks/useTournament";
import { type GameType } from "~/types/tournament.types";
import {
  type HandleScoreSaveTypeArgs,
  type HandleScoreChangTypeArgs,
  type GamesScoresType,
} from "~/types/utils.types";
import { api } from "../utils/api";

const useTournamentGames = () => {
  const router = useRouter();
  const [gamesScores, setGamesScores] = useState<GamesScoresType[]>([
    {
      gameId: "",
      teamOneId: "",
      teamTwoId: "",
      teamOneScore: 0,
      teamTwoScore: 0,
    },
  ]);
  const [games, setGames] = useState<GameType[]>([]);
  const { mutate } = api.game.updateGame.useMutation();
  const { isLoading, tournament, setTournamentId } = useTournament();

  const handleScoreChange = ({
    num,
    gameId,
    teamId,
  }: HandleScoreChangTypeArgs) => {
    const newGamesScores = gamesScores.map((gameScore) => {
      if (gameScore.gameId === gameId) {
        if (gameScore.teamOneId === teamId) {
          return {
            ...gameScore,
            teamOneScore: num,
          };
        }
        if (gameScore.teamTwoId === teamId) {
          return {
            ...gameScore,
            teamTwoScore: num,
          };
        }
      }
      return gameScore;
    });

    setGamesScores(newGamesScores);
  };

  const handleScoreSave = ({ game }: HandleScoreSaveTypeArgs) => {
    // TODO: Create json file with games set
    // TODO: save score to db
    console.log("game", game);

    const gameScore = gamesScores.find(
      (gameScore) => gameScore.gameId === game.id
    );

    console.log("gameScore", gameScore);

    if (gameScore) {
      mutate(gameScore);
    }
  };

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  useEffect(() => {
    if (tournament?.games) {
      setGames(tournament.games);
      setGamesScores(
        tournament.games.map((game) => {
          return {
            gameId: game.id,
            teamOneId: game.teamOneId,
            teamTwoId: game.teamTwoId,
            teamOneScore: 0,
            teamTwoScore: 0,
          };
        })
      );
    }
  }, [tournament?.games]);

  return {
    games,
    isLoading,
    gamesScores,
    handleScoreSave,
    handleScoreChange,
    tournamentName: tournament?.name,
  };
};

export default useTournamentGames;
