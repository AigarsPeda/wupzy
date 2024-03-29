import { Fragment, type FC } from "react";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import { type GameSetsType } from "~/types/tournament.types";
import classNames from "~/utils/classNames";

interface DisplaySetScoreProps {
  teamOneName: string;
  teamTwoName: string;
  gameSets: GameSetsType;
}

const DisplaySetScore: FC<DisplaySetScoreProps> = ({
  gameSets,
  teamOneName,
  teamTwoName,
}) => {
  return (
    <div className="mx-auto min-h-[4rem] w-56 md:w-52">
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-4 text-center">
          <p className="font-primary text-xs text-gray-900">Sets</p>
        </div>
        <div className="col-span-4 text-center">
          <Tooltip content={teamOneName} isNowrap>
            <p className="truncate font-primary text-xs text-gray-900">
              {teamOneName}
            </p>
          </Tooltip>
        </div>
        <div className="col-span-4 text-center">
          <Tooltip content={teamTwoName} isNowrap>
            <p className="truncate font-primary text-xs text-gray-900">
              {teamTwoName}
            </p>
          </Tooltip>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-12 gap-x-3 gap-y-1">
        {Object.entries(gameSets).map(([key, value], i) => {
          return (
            <Fragment key={i}>
              <div className="col-span-4 text-center">
                <p className="font-primary text-xs text-gray-900">{key}</p>
              </div>
              <div className="col-span-4 text-center">
                <p
                  className={classNames(
                    value.teamOne > value.teamTwo
                      ? "text-gray-900"
                      : "text-gray-900",
                    "font-primary text-xs"
                  )}
                >
                  {value.teamOne}
                </p>
              </div>
              <div className="col-span-4 text-center">
                <p
                  className={classNames(
                    value.teamOne < value.teamTwo
                      ? "text-gray-900"
                      : "text-gray-900",
                    "font-primary text-xs"
                  )}
                >
                  {value.teamTwo}
                </p>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DisplaySetScore;
