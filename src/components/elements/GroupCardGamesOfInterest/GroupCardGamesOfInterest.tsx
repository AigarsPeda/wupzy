import Button from "components/elements/Button/Button";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import type { FC } from "react";
import type { GamesOfInterestType } from "types/game.types";
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
  totalGames: {
    [key: string]: number;
  };
  handleDisplayAllClick: () => void;
  handleScoreSave: (
    gameId: string,
    firstTeamIds: string[],
    secondTeamIds: string[]
  ) => void;
  handleScoreChange: (team: string, score: number) => void;
}

const GroupCardGamesOfInterest: FC<GroupCardGamesOfInterestProps> = ({
  group,
  totalGames,
  firstTeamScore,
  secondTeamScore,
  gamesOfInterest,
  handleScoreSave,
  handleScoreChange,
  handleDisplayAllClick,
}) => {
  const getGames = () => {
    console.log("gamesOfInterest", gamesOfInterest);

    const games = gamesOfInterest[group];
    return games ? Object.entries(games).sort() : undefined;
  };

  return (
    <div className="col-span-3 md:pr-5">
      <GroupCardHeader
        label="Games"
        title={group}
        options={
          <button
            onClick={handleDisplayAllClick}
            className="text-sm transition-all duration-200 hover:text-slate-900"
          >
            View all
          </button>
        }
      />
      <div className="mb-5 h-full">
        {getGames() ? (
          getGames()?.map(([key, game], i) => {
            const gameStatus = GAME_STATUS[key];
            const gameCount = totalGames[group] || 0;
            const isCurrentGame = gameStatus === "Current";
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
                      "mb-3 w-20 border-b-2  md:mr-3 md:mb-0 md:border-b-0 md:border-r-2 md:px-2"
                    )}
                  >
                    <p className="mb-1 text-xs text-gray-400">{gameStatus}</p>
                    <p className="pb-1 text-xs">
                      {game && `${gameOrderNumber} of ${gameCount}`}
                    </p>
                  </div>
                  {game ? (
                    <div className="flex space-x-4">
                      <DisplayTeams
                        infoScore={game.team1Score}
                        teamsScore={firstTeamScore}
                        isCurrentGame={isCurrentGame}
                        team={game.team1.participants}
                        handleScoreChange={(n) => {
                          handleScoreChange("firstTeam", n);
                        }}
                      />

                      <DisplayTeams
                        infoScore={game.team2Score}
                        teamsScore={secondTeamScore}
                        isCurrentGame={isCurrentGame}
                        team={game.team2.participants}
                        handleScoreChange={(n) => {
                          handleScoreChange("secondTeam", n);
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-400">no game</p>
                  )}
                </div>

                {isCurrentGame && (
                  <div className="grid content-end">
                    <div className="mt-3 h-full w-full">
                      <Button
                        btnColor="outline"
                        btnTitle="Save score"
                        btnClass="border-gray-400 h-[2.58rem]"
                        onClick={() => {
                          if (!game) return;

                          const firstTeamIds = game.team1.participants.map(
                            (team) => team.id
                          );

                          const secondTeamsIds = game.team2.participants.map(
                            (team) => team.id
                          );

                          handleScoreSave(
                            game.id,
                            firstTeamIds,
                            secondTeamsIds
                          );
                        }}
                      />
                    </div>
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
