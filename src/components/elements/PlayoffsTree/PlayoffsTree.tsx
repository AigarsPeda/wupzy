import { type FC } from "react";
import { type PlayoffType } from "~/types/utils.types";
import classNames from "~/utils/classNames";
import genUniqueId from "~/utils/genUniqueId";

interface PlayoffsTreeProps {
  playoffTree: PlayoffType[];
}

const PlayoffsTree: FC<PlayoffsTreeProps> = ({ playoffTree }) => {
  return (
    <>
      {playoffTree.map((round, i) => {
        const isLast = i === playoffTree.length - 1;

        return (
          <div
            key={genUniqueId()}
            className={classNames(
              !isLast && "mr-20",
              "flex flex-col justify-center"
            )}
          >
            {/* <h1 className="text-center">{round.name}</h1> */}
            {round.matches.map((match, i) => {
              const isLast = i === round.matches.length - 1;
              return (
                <div
                  key={match.id}
                  className={classNames(
                    !isLast && "mb-10",
                    "flex flex-col items-center justify-center",
                    // match.right && "border-l-2 border-black",
                    // match.left && "border-r-2 border-black",
                    "flex flex-col rounded-md bg-gray-100 p-1 shadow"
                  )}
                >
                  <h2>Name {match.name}</h2>
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
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default PlayoffsTree;
