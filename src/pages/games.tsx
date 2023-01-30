import type { FC } from "react";
import { api } from "../utils/api";

const GamesPage: FC = () => {
  const secretGames = api.games.getAllGames.useQuery({ text: "from tRPC2" });

  return (
    <div>
      <h1>Games</h1>
      <p>{secretGames.data?.greeting}</p>
    </div>
  );
};

export default GamesPage;
