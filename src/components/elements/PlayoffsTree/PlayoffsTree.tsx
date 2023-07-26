import { type FC } from "react";
import { type PlayoffRoundType } from "~/types/utils.types";
import classNames from "~/utils/classNames";
import genUniqueId from "~/utils/genUniqueId";

interface PlayoffsTreeProps {
  playoffTree: Map<number, PlayoffRoundType[]> | never[];
}

const PlayoffsTree: FC<PlayoffsTreeProps> = ({ playoffTree }) => {
  return (
    <>
      {[...playoffTree].map(([_key, value], i) => {
        const isLast = i === [...playoffTree].length - 1;

        return (
          <div
            key={genUniqueId()}
            className={classNames(
              !isLast && "mr-20",
              "flex flex-col justify-center"
            )}
          >
            {/* <h1 className="text-center">{round.name}</h1> */}
            {value.map((match, i) => {
              const isLast = i === value.length - 1;
              return (
                // <div
                //   key={match.id}
                //   className="mx-auto mt-10 rounded-[0.475rem] bg-gradient-to-r from-purple-400 to-pink-600 p-[0.1rem] shadow"
                // >
                <div
                  key={match.id}
                  className={classNames(
                    !isLast && "mb-10",
                    // match.right && "border-l-2 border-black",
                    // match.left && "border-r-2 border-black",
                    "flex flex-col items-center justify-center rounded-md bg-gray-100 p-1 shadow-md"
                  )}
                >
                  {/* <h2>Name {match.name}</h2> */}
                  <div className="min-w-[12rem]">
                    {match.teams.map((team, i) => {
                      const isLast = i === match.teams.length - 1;

                      return (
                        <div
                          key={genUniqueId()}
                          className={classNames(
                            !isLast && "mb-2",
                            "flex space-x-1 rounded bg-gray-200 px-2 py-2"
                          )}
                        >
                          <p className="min-h-[1.2rem]">{team?.name || ""}</p>
                          {/* <span>{team.score}</span> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
                // </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default PlayoffsTree;
