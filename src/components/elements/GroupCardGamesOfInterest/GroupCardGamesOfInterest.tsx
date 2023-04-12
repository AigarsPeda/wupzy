import Button from "components/elements/Button/Button";
import DisplaySetScore from "components/elements/DisplaySetScore/DisplaySetScore";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import getWinsPerTeam from "components/elements/GroupCard/utils/getWinsPerTeam";
import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import type { GamesOfInterestType, GamesType } from "types/game.types";
import { GameSets } from "types/game.types";
import type { TournamentTypeType } from "types/tournament.types";
import classNames from "utils/classNames";

const GAME_STATUS: {
  [key: string]: string;
} = {
  "1": "Next",
  "0": "Current",
  "-1": "Previous",
} as const;

interface GroupCardGamesOfInterestProps {
  group: string;
  firstTeamScore: number;
  secondTeamScore: number;
  gamesOfInterest: GamesOfInterestType;
  tournamentKind: TournamentTypeType;
  totalGames: {
    [key: string]: number;
  };
  handleDisplayAllClick: () => void;
  handleScoreSave: (
    game: GamesType,
    firstTeamIds: string[],
    secondTeamIds: string[]
  ) => void;
  handleScoreChange: (team: string, score: number) => void;
}

const GroupCardGamesOfInterest: FC<GroupCardGamesOfInterestProps> = ({
  group,
  totalGames,
  tournamentKind,
  firstTeamScore,
  secondTeamScore,
  gamesOfInterest,
  handleScoreSave,
  handleScoreChange,
  handleDisplayAllClick,
}) => {
  const getGames = () => {
    const games = gamesOfInterest[group];
    return games ? Object.entries(games).sort() : undefined;
  };

  return (
    <div>
      <GroupCardHeader
        label="Games"
        title={group}
        options={
          <UnderLineButton
            btnClass="mb-2"
            lineClassNames="-bottom-2"
            btnTitle={<span className="px-3 text-base">View all games</span>}
            onClick={handleDisplayAllClick}
          />
        }
      />
      <div className="mb-5 h-full">
        {getGames() ? (
          getGames()?.map(([key, game], i) => {
            const gameSets = game?.gameSets;
            const gameStatus = GAME_STATUS[key];
            const gameCount = totalGames[group] || 0;
            const isCurrentGame = gameStatus === "Current";
            const finishedGames = gameSets ? GameSets.parse(gameSets) : {};
            const { firstTeamWins, secondTeamWins } =
              getWinsPerTeam(finishedGames);
            const gameOrderNumber = gamesOfInterest[group]?.["-1"] ? i + 1 : i;

            return (
              <div
                key={key}
                className={classNames(
                  isCurrentGame
                    ? "bg-gray-800 py-3 text-white md:py-6"
                    : "bg-gray-200 py-1 md:py-3",
                  "relative mb-3 rounded-md px-3 md:flex"
                )}
              >
                <div className="w-full md:flex">
                  <div
                    className={classNames(
                      isCurrentGame ? "border-gray-400" : "border-gray-100",
                      "mb-3 flex w-full justify-between border-b-2  md:mb-0 md:mr-3 md:block md:w-24 md:border-b-0 md:border-r-2 md:px-2"
                    )}
                  >
                    <div>
                      <p className="mb-1 text-xs text-gray-400">Game</p>
                      <p className="pb-1 text-xs">
                        {game && `${gameOrderNumber} of ${gameCount}`}
                      </p>
                    </div>
                    {isCurrentGame && (
                      <div>
                        <div className="flex items-center">
                          <p className={classNames("text-2xl text-white")}>
                            {firstTeamWins} - {secondTeamWins}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {game ? (
                    <div className="w-full">
                      <div className="w-full">
                        <div
                          className={classNames(
                            isCurrentGame ? "" : "flex",
                            "w-full justify-between"
                          )}
                        >
                          <div className="flex">
                            <div>
                              <DisplayTeams
                                teamsScore={firstTeamScore}
                                isCurrentGame={isCurrentGame}
                                team={game.team1.participants}
                                infoScore={firstTeamWins.toString()}
                                teamName={
                                  tournamentKind === "TEAMS"
                                    ? game.team1.name
                                    : undefined
                                }
                                handleScoreChange={(n) => {
                                  handleScoreChange("firstTeam", n);
                                }}
                              />
                            </div>
                            <div className="mx-2">
                              <DisplayTeams
                                teamsScore={secondTeamScore}
                                isCurrentGame={isCurrentGame}
                                team={game.team2.participants}
                                infoScore={secondTeamWins.toString()}
                                teamName={
                                  tournamentKind === "TEAMS"
                                    ? game.team2.name
                                    : undefined
                                }
                                handleScoreChange={(n) => {
                                  handleScoreChange("secondTeam", n);
                                }}
                              />
                            </div>
                            {isCurrentGame && (
                              <div className="flex w-32 flex-col items-end justify-end">
                                <Button
                                  btnColor="outline"
                                  btnTitle="Save score"
                                  btnClass="border-gray-400 h-[2.5rem] w-full"
                                  onClick={() => {
                                    if (!game) return;

                                    const firstTeamIds =
                                      game.team1.participants.map(
                                        (team) => team.id
                                      );

                                    const secondTeamsIds =
                                      game.team2.participants.map(
                                        (team) => team.id
                                      );

                                    handleScoreSave(
                                      game,
                                      firstTeamIds,
                                      secondTeamsIds
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div
                            className={classNames(
                              isCurrentGame && "mt-3",
                              "w-full max-w-[5rem]"
                            )}
                          >
                            <DisplaySetScore game={game} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">no game</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p className="text-2xl text-gray-800">No games</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCardGamesOfInterest;
