import { Fragment, type FC } from "react";
import { GameSets, type GameType } from "~/types/tournament.types";
import classNames from "../../../utils/classNames";

interface DisplaySetScoreProps {
  game: GameType;
}

const DisplaySetScore: FC<DisplaySetScoreProps> = ({ game }) => {
  return (
    <div className="mx-auto min-h-[5rem] w-52">
      <div className="grid grid-cols-9 gap-x-3">
        <div className="col-span-3 text-center">
          <p className="font-primary text-xs text-gray-500">Sets</p>
        </div>
        <div className="col-span-3 text-center">
          <p className="truncate font-primary text-xs text-gray-500">
            {game?.teamOne?.name}
          </p>
        </div>
        <div className="col-span-3 text-center">
          <p className="truncate font-primary text-xs text-gray-500">
            {game?.teamTwo?.name}
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-9 gap-x-3 gap-y-1">
        {Object.entries(GameSets.parse(game.gameSets) || {}).map(
          ([key, value], i) => {
            return (
              <Fragment key={i}>
                <div className="col-span-3 text-center">
                  <p className="font-primary text-xs text-gray-500">{key}</p>
                </div>
                <div className="col-span-3 text-center">
                  <p
                    className={classNames(
                      value.teamOne > value.teamTwo
                        ? "text-gray-900"
                        : "text-gray-500",
                      "font-primary text-xs"
                    )}
                  >
                    {value.teamOne}
                  </p>
                </div>
                <div className="col-span-3 text-center">
                  <p
                    className={classNames(
                      value.teamOne < value.teamTwo
                        ? "text-gray-900"
                        : "text-gray-500",
                      "font-primary text-xs"
                    )}
                  >
                    {value.teamTwo}
                  </p>
                </div>
              </Fragment>
            );
          }
        )}
      </div>
    </div>
  );
};

export default DisplaySetScore;
