import Button from "components/elements/Button/Button";
import DisplayPlayoffTeams from "components/elements/DisplayPlayoffTeams/DisplayPlayoffTeams";
import DisplaySetScore from "components/elements/DisplaySetScore/DisplaySetScore";
import getWinsPerTeam from "components/elements/GroupCard/utils/getWinsPerTeam";
import type { GamePlayoffType } from "components/elements/PlayoffBrackets/utils/cratePlayoffInputMap";
import type { FC } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { GameSets } from "types/game.types";
import type { TeamType } from "types/team.types";
import classNames from "utils/classNames";

type CoordinatesType = {
  end: number[];
  start: number[];
};

interface PlayoffBracketsProps {
  isShare?: boolean;
  isLoading: boolean;
  brackets: [string, GamePlayoffType[]][];
  handleScoreSave: (game: GamePlayoffType) => void;
  handleScoreChange: (n: number, team: TeamType, stage: string) => void;
}

const PlayoffBrackets: FC<PlayoffBracketsProps> = ({
  isShare,
  brackets,
  isLoading,
  handleScoreSave,
  handleScoreChange,
}) => {
  return (
    <div className="grid grid-flow-col overflow-y-auto">
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
              " flex flex-col items-center justify-center transition-all"
            )}
          >
            <div className="w-full">
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

                const isBothTeams = Boolean(
                  firstTeam?.team1.id && secondTeam?.team2.id
                );

                const necessaryToWin = game.setsInGame;

                const team1Score = firstTeam?.team1Score;
                const team2Score = secondTeam?.team2Score;

                const gameSets = game.gameSets;
                const finishedGames = gameSets ? GameSets.parse(gameSets) : {};

                const { firstTeamWins, secondTeamWins } =
                  getWinsPerTeam(finishedGames);

                const hasWinner =
                  necessaryToWin === firstTeamWins ||
                  necessaryToWin === secondTeamWins;

                return (
                  <div key={`${index}`} className="relative w-full">
                    <Xwrapper>
                      <div
                        id={`elem${c.start.join("")}`}
                        className="min-h-[4rem]  rounded bg-gray-300"
                        style={{
                          marginBottom: isLast
                            ? `${i + 1}.${i * 3}rem`
                            : marginBottom,
                        }}
                      >
                        <div className="min-h-[3.9rem] items-end truncate rounded bg-gray-800 px-2 py-1 text-white">
                          <div className="flex min-w-[10rem] items-center justify-between space-x-2">
                            {firstTeam && (
                              <div className="w-full">
                                <DisplayPlayoffTeams
                                  isShare={isShare}
                                  hasWinner={hasWinner}
                                  wonSets={firstTeamWins}
                                  smallPoints={team1Score}
                                  isBothTeams={isBothTeams}
                                  isScoreDisplay={Boolean(secondTeam)}
                                  teamName={firstTeam.team1.name || ""}
                                  participants={
                                    firstTeam.team1.participants || []
                                  }
                                  handleScoreChange={(n) => {
                                    handleScoreChange(
                                      n,
                                      firstTeam.team1,
                                      stage
                                    );
                                  }}
                                />
                              </div>
                            )}
                            {secondTeam && (
                              <div className="w-full">
                                <DisplayPlayoffTeams
                                  isShare={isShare}
                                  hasWinner={hasWinner}
                                  smallPoints={team2Score}
                                  wonSets={secondTeamWins}
                                  isBothTeams={isBothTeams}
                                  isScoreDisplay={Boolean(firstTeam)}
                                  teamName={secondTeam.team2.name || ""}
                                  participants={
                                    secondTeam.team2.participants || []
                                  }
                                  handleScoreChange={(n) => {
                                    handleScoreChange(
                                      n,
                                      secondTeam.team2,
                                      stage
                                    );
                                  }}
                                />
                              </div>
                            )}
                            <div>
                              {firstTeam &&
                                secondTeam &&
                                !hasWinner &&
                                !isShare && (
                                  <Button
                                    btnTitle="Save"
                                    btnColor="outline"
                                    isLoading={isLoading}
                                    btnClass="h-[2.5rem] md:w-[8rem] w-24"
                                    onClick={() => {
                                      handleScoreSave(game);
                                    }}
                                  />
                                )}
                            </div>
                          </div>

                          <div className={classNames("w-full max-w-[5rem]")}>
                            <DisplaySetScore game={game} />
                          </div>
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayoffBrackets;
