import Button from "components/elements/Button/Button";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import type { GamesOfInterestType } from "types/game.types";
import type { TournamentTypeType } from "types/tournament.types";
import classNames from "utils/classNames";
import type { GamesType } from "types/game.types";
import getWinsPerTeam from "../GroupCard/utils/getWinsPerTeam";

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
    <div className="col-span-3 md:pr-5">
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
            const gameStatus = GAME_STATUS[key];
            const gameCount = totalGames[group] || 0;
            const isCurrentGame = gameStatus === "Current";
            const { firstTeamWins, secondTeamWins } = getWinsPerTeam(game);
            const gameOrderNumber = gamesOfInterest[group]?.["-1"] ? i + 1 : i;

            return (
              <div
                key={key}
                className={classNames(
                  isCurrentGame
                    ? "bg-gray-800 py-3 text-white md:py-6"
                    : "bg-gray-200 py-1 md:py-3",
                  "mb-3 rounded-md px-3 md:flex"
                )}
              >
                <div className="w-full md:flex">
                  <div
                    className={classNames(
                      isCurrentGame ? "border-gray-400" : "border-gray-100",
                      "mb-3 w-20 border-b-2  md:mb-0 md:mr-3 md:border-b-0 md:border-r-2 md:px-2"
                    )}
                  >
                    {/* <p className="mb-1 text-xs text-gray-400">{gameStatus}</p> */}
                    <p className="mb-1 text-xs text-gray-400">Game</p>
                    <p className="pb-1 text-xs">
                      {game && `${gameOrderNumber} of ${gameCount}`}
                    </p>
                    <p className="text-sm text-gray-400">Set</p>
                    <p
                      className={classNames(
                        !isCurrentGame && "text-gray-400",
                        "text-xl"
                      )}
                    >
                      {game?.gameSet}
                    </p>
                  </div>
                  {game ? (
                    <div>
                      <div className="flex w-full space-x-2">
                        <div className="w-[50%]">
                          <DisplayTeams
                            teamsScore={firstTeamScore}
                            isCurrentGame={isCurrentGame}
                            team={game.team1.participants}
                            infoScore={game.team1Score || 0}
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
                        <div className="w-[50%]">
                          <DisplayTeams
                            teamsScore={secondTeamScore}
                            isCurrentGame={isCurrentGame}
                            team={game.team2.participants}
                            infoScore={game.team2Score || 0}
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
                      </div>
                      <div className="mt-2 flex items-center">
                        <p>
                          <span className="mr-5 text-xs text-gray-400">
                            Score per sets
                          </span>
                        </p>
                        <p
                          className={classNames(
                            !isCurrentGame && "text-gray-400",
                            ""
                          )}
                        >
                          {firstTeamWins} - {secondTeamWins}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">no game</p>
                  )}
                </div>

                {isCurrentGame && (
                  <div className="mt-3 flex w-full flex-col justify-center md:mt-2">
                    <Button
                      btnColor="outline"
                      btnTitle="Save score"
                      btnClass="border-gray-400 h-[2.5rem] w-32"
                      onClick={() => {
                        if (!game) return;

                        const firstTeamIds = game.team1.participants.map(
                          (team) => team.id
                        );

                        const secondTeamsIds = game.team2.participants.map(
                          (team) => team.id
                        );

                        handleScoreSave(game, firstTeamIds, secondTeamsIds);
                      }}
                    />
                  </div>
                )}
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
