import type { GamePlayoffType } from "components/elements/BracketsInput/utils/cratePlayoffInputMap";
import Button from "components/elements/Button/Button";
import DisplayPlayoffTeams from "components/elements/DisplayPlayoffTeams/DisplayPlayoffTeams";
import type { FC } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import type { TeamType } from "types/team.types";
import classNames from "utils/classNames";

type CoordinatesType = {
  end: number[];
  start: number[];
};

interface BracketsInputProps {
  brackets: [string, GamePlayoffType[]][];
  handleScoreSave: (game: GamePlayoffType) => void;
  handleScoreChange: (n: number, team: TeamType, stage: string) => void;
}

const BracketsInput: FC<BracketsInputProps> = ({
  brackets,
  handleScoreSave,
  handleScoreChange,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {brackets.map((games, i) => {
        const [stage, teams] = games;

        const hasNext = i < brackets.length - 1;
        const isLast = i === brackets.length - 1;
        const nextArrow = hasNext ? brackets[i + 1] : [];
        const nextTeams = nextArrow && nextArrow.length > 1 ? nextArrow[1] : [];

        return (
          <div
            key={`${stage}${i}`}
            className={classNames(
              i === 0 ? "" : "ml-2 md:ml-10",
              "flex w-full flex-col items-center justify-center transition-all"
            )}
          >
            <>
              {teams.map((game, index) => {
                const group = i + 1 > brackets.length ? brackets.length : i + 1;
                const position =
                  Math.floor(index / 2) > nextTeams.length - 1
                    ? 0
                    : Math.floor(index / 2);

                const c: CoordinatesType = {
                  start: [i, index],
                  end: [group, position],
                };

                const firstTeam = game.team1;
                const secondTeam = game.team2;
                const marginBottom = `${Math.floor(i * 2 + 2)}rem`;

                return (
                  <div key={`${index}`} className="w-full">
                    <Xwrapper>
                      <div
                        id={`elem${c.start.join("")}`}
                        className="min-h-[4rem] w-full rounded bg-gray-300"
                        style={{
                          marginBottom: isLast
                            ? `${i + 1}.${i * 3}rem`
                            : marginBottom,
                        }}
                      >
                        <div className="flex min-h-[3.9rem] items-end space-x-2 truncate rounded bg-gray-800 px-2 py-1 text-white">
                          {firstTeam && (
                            <DisplayPlayoffTeams
                              teamName={firstTeam.team1.name || ""}
                              isScoreDisplay={Boolean(secondTeam)}
                              smallPoints={firstTeam.team1Score || 0}
                              participants={firstTeam.team1.participants || []}
                              handleScoreChange={(n) => {
                                handleScoreChange(n, firstTeam.team1, stage);
                              }}
                            />
                          )}
                          {secondTeam && (
                            <DisplayPlayoffTeams
                              teamName={secondTeam.team2.name || ""}
                              isScoreDisplay={Boolean(firstTeam)}
                              smallPoints={secondTeam.team2Score || 0}
                              participants={secondTeam.team2.participants || []}
                              handleScoreChange={(n) => {
                                handleScoreChange(n, secondTeam.team2, stage);
                              }}
                            />
                          )}
                          {firstTeam && secondTeam && (
                            <Button
                              btnClass="h-[2.5rem]"
                              btnTitle="Save"
                              btnColor="outline"
                              onClick={() => {
                                handleScoreSave(game);
                                console.log("save");
                              }}
                            />
                          )}
                        </div>

                        {!isLast && (
                          <Xarrow
                            path="grid"
                            headSize={0}
                            strokeWidth={2}
                            color="#d1d5db"
                            endAnchor="left"
                            startAnchor="right"
                            end={`elem${c.end.join("")}`}
                            start={`elem${c.start.join("")}`}
                          />
                        )}
                      </div>
                    </Xwrapper>
                  </div>
                );
              })}
            </>
          </div>
        );
      })}
    </div>
  );
};

export default BracketsInput;
