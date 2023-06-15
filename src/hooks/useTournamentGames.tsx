import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  type GamesScoresType,
  type HandleScoreChangTypeArgs,
  type HandleScoreSaveTypeArgs,
} from "~/types/utils.types";
import { api } from "~/utils/api";

const useTournamentGames = () => {
  const { query } = useRouter();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading, refetch } = api.game.getGames.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) }
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
      isSaving: false,
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
      setGamesScores(
        gamesScores.map((gameScore) => {
          if (gameScore.gameId === game.id) {
            return {
              ...gameScore,
              isSaving: true,
            };
          }
          return gameScore;
        })
      );

      mutate({
        tournamentId,
        scores: gameScore,
      });
    }
  };

  useEffect(() => {
    if (query.id && typeof query.id === "string") {
      setTournamentId(query.id);
    }
  }, [query.id, setTournamentId]);

  useEffect(() => {
    if (data?.games) {
      setGamesScores(
        data.games.map((game) => {
          return {
            gameId: game.id,
            teamOneScore: 0,
            teamTwoScore: 0,
            isSaving: false,
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
