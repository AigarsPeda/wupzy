import { type FC } from "react";
import { type GameType } from "~/types/tournament.types";

interface DisplayGamesProps {
  games: GameType[] | undefined;
}

const DisplayGames: FC<DisplayGamesProps> = ({ games }) => {
  return (
    <div>
      <div className="mb-2 mt-6">
        <p className="font-primary font-medium text-gray-500">Games</p>
      </div>
      <div className="relative flex overflow-x-auto">
        <div className="flex w-full space-x-2 overflow-x-auto">
          {games?.map((game) => {
            return (
              <div key={game.id} className="rounded bg-gray-300 p-2">
                <div className="flex space-x-1">
                  <p>{game.teamOne.name}</p>
                  <p>VS</p>
                  <p>{game.teamTwo.name}</p>
                </div>
                <div className="flex space-x-1">
                  <p>{game.teamOneScore}</p>
                  <p>VS</p>
                  <p>{game.teamTwoScore}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="z-1 absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent to-gray-100" />
      </div>
    </div>
  );
};

export default DisplayGames;
