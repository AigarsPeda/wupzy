import { useEffect, useState } from "react";
import useTournament from "~/hooks/useTournament";
import { type GameType } from "~/types/tournament.types";
import {
  type GamesScoresType,
  type HandleScoreChangTypeArgs,
  type HandleScoreSaveTypeArgs,
} from "~/types/utils.types";
import { api } from "~/utils/api";

const useTournamentGames = () => {
  const getTournament = api.useContext().tournament.getTournament;
  const { isLoading, tournament } = useTournament();
  const [games, setGames] = useState<GameType[]>([]);
  const { mutate } = api.game.updateGame.useMutation({
    onSuccess: () => {
      void getTournament.invalidate();
    },
  });

  const [gamesScores, setGamesScores] = useState<GamesScoresType[]>([
    {
      gameId: "",
      teamOneId: "",
      teamTwoId: "",
      teamOneScore: 0,
      teamTwoScore: 0,
    },
  ]);

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
    const gameScore = gamesScores.find(
      (gameScore) => gameScore.gameId === game.id
    );

    if (gameScore) {
      mutate(gameScore);
    }
  };

  useEffect(() => {
    if (tournament?.games) {
      setGames(tournament.games);
      setGamesScores(
        tournament.games.map((game) => {
          return {
            gameId: game.id,
            teamOneScore: 0,
            teamTwoScore: 0,
            teamOneId: game.teamOneId,
            teamTwoId: game.teamTwoId,
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
