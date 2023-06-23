import { useEffect, useState } from "react";
import { GameSets, type GameType } from "~/types/tournament.types";
import { api } from "~/utils/api";

const useGame = (gameId: string, handleModalClose?: () => void) => {
  const { teams, player, game: games } = api.useContext();
  const [game, setGame] = useState<GameType | undefined>(undefined);
  const { data } = api.game.getGame.useQuery(
    { id: gameId },
    { enabled: Boolean(gameId), refetchOnWindowFocus: false }
  );

  const { mutate, isLoading } = api.game.updateGame.useMutation({
    onSuccess: () => {
      void games.invalidate();
      void teams.invalidate();
      void player.invalidate();

      if (handleModalClose) {
        handleModalClose();
      }
    },
  });

  useEffect(() => {
    if (data?.game && GameSets.parse(data?.game?.gameSets)) {
      const gameSets = GameSets.parse(data?.game?.gameSets);

      const newGame = {
        ...data.game,
        gameSets,
      };

      setGame(newGame);
    }
  }, [data]);

  return {
    game,
    mutate,
    setGame,
    isLoading,
  };
};

export default useGame;
