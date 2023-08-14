import { type FC } from "react";
import { type PlayGameType, type PlayOffTeamType } from "~/types/playoff.types";
import { type GameSetsType } from "~/types/tournament.types";
import classNames from "~/utils/classNames";
import genUniqueId from "~/utils/genUniqueId";

type DisplayTeamsArgs = {
  isLast: boolean;
  isBothTeams: boolean;
  team: PlayOffTeamType;
};

type DisplaySetResultArgs = {
  teamOneName: string;
  teamTwoName: string;
  gameSets: GameSetsType;
};

interface PlayoffsTreeProps {
  playoffTree: Map<number, PlayGameType[]> | never[];
  displayTeamsComponent: ({ team, isLast }: DisplayTeamsArgs) => JSX.Element;
  displaySetResult?: ({
    gameSets,
    teamOneName,
    teamTwoName,
  }: DisplaySetResultArgs) => JSX.Element;
}

const PlayoffsTree: FC<PlayoffsTreeProps> = ({
  playoffTree,
  displaySetResult,
  displayTeamsComponent,
}) => {
  return (
    <div className={classNames("flex overflow-x-auto px-14 py-5")}>
      {[...playoffTree].map(([_key, value], i) => {
        const isLast = i === [...playoffTree].length - 1;

        return (
          <div
            key={genUniqueId()}
            className={classNames(
              !isLast && "mr-14 md:mr-16",
              "mx-auto flex flex-col justify-center"
            )}
          >
            {/* <h1 className="text-center">{round.name}</h1> */}
            {value.map((match, i) => {
              const isLast = i === value.length - 1;
              const firstTeamName = match.teams?.[0]?.name;
              const secondTeamName = match.teams?.[1]?.name;
              const isBothTeams = Boolean(firstTeamName && secondTeamName);

              return (
                <div key={match.id} className={classNames(!isLast && "mb-10")}>
                  <div
                    className={classNames(
                      // match.right && "border-l-2 border-black",
                      // match.left && "border-r-2 border-black",
                      "flex flex-col items-center justify-center rounded-md bg-gray-100 p-1 shadow-md"
                    )}
                  >
                    {/* <h2>Name {match.name}</h2> */}
                    <div className="w-full min-w-[10rem] md:min-w-[12rem]">
                      {match.teams?.map((team, i) => {
                        const isLast = i === match.teams.length - 1;

                        return (
                          <div key={genUniqueId()}>
                            {displayTeamsComponent({
                              team,
                              isLast,
                              isBothTeams,
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {displaySetResult && (
                    <div className="mt-5">
                      {displaySetResult({
                        gameSets: match.gameSets || {},
                        teamOneName: firstTeamName || "",
                        teamTwoName: secondTeamName || "",
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PlayoffsTree;
