import type { FC } from "react";
import type { ActivesGame } from "types/game.types";
import getScoredPerSet from "utils/getScoredPerSet";
import type { GamePlayoffType } from "components/elements/BracketsInput/utils/cratePlayoffInputMap";

interface DisplaySetScoreProps {
  game: ActivesGame | GamePlayoffType;
}

const DisplaySetScore: FC<DisplaySetScoreProps> = ({ game }) => {
  const { finishedGamesMap } = getScoredPerSet(game);

  return (
    <div className="w-full">
      {finishedGamesMap &&
        [...finishedGamesMap].map(([key, setResult]) => {
          return (
            <div key={key} className="flex w-full justify-between">
              <div>
                <p className="flex w-4 justify-between text-xs text-gray-400">
                  {key} <span className="mx-0.5">|</span>
                </p>
              </div>
              <div className="ml-1 grid w-full grid-cols-3 justify-between text-xs text-gray-400">
                <div className="w-full text-left">
                  <p>{setResult.firstTeam}</p>
                </div>
                <div className="w-full text-center">
                  <p>-</p>
                </div>
                <div className="w-full text-right">
                  <p>{setResult.secondTeam}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DisplaySetScore;
