import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  type GamesScoresType,
  type HandleScoreChangTypeArgs,
  type HandleScoreSaveTypeArgs,
} from "~/types/utils.types";
import { api } from "~/utils/api";
import validateIsString from "~/utils/validateIsString";

const useTournamentGames = () => {
  const { isReady, query } = useRouter();
  const { data, isLoading, refetch } = api.game.getGames.useQuery(
    { id: validateIsString(query.id) ? query.id : "" },
    { enabled: isReady && validateIsString(query.id) }
  );

  const { mutate } = api.game.updateGame.useMutation({
    onSuccess: () => {
      void refetch();
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
    if (data?.games) {
      setGamesScores(
        data.games.map((game) => {
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
  }, [data?.games]);

  return {
    isLoading,
    gamesScores,
    handleScoreSave,
    handleScoreChange,
    games: data?.games || [],
  };
};

export default useTournamentGames;
