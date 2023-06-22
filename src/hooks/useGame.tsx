import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GameSets, type GameType } from "~/types/tournament.types";
import { api } from "~/utils/api";
import validateIsString from "~/utils/validateIsString";

const useGame = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { mutate, isLoading } = api.game.updateGame.useMutation();
  const [game, setGame] = useState<GameType | undefined>(undefined);
  const { data } = api.game.getGame.useQuery(
    { id: validateIsString(router.query.gameId) ? router.query.gameId : "" },
    {
      enabled: Boolean(router.query.gameId) && sessionData?.user !== undefined,
      refetchOnWindowFocus: false,
    }
  );

  const handleScoreChange = (game: GameType) => {
    setGame(game);
  };

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
    isLoading,
    handleScoreChange,
    isId: Boolean(router.query.gameId),
  };
};

export default useGame;
