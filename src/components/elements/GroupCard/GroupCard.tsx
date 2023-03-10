import type { ActivesGameType } from "components/containers/GroupCardContainer/GroupCardContainer";
import Button from "components/elements/Button/Button";
import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import { useState } from "react";
import type { ParticipantsType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";

const GAME_STATUS: {
  [key: string]: string;
} = {
  "1": "Next",
  "0": "Current",
  "-1": "Previous",
} as const;

interface GroupCardProps {
  group: string;
  teams: ParticipantsType[];
  gamesOfInterest: ActivesGameType;
  totalGames: {
    [key: string]: number;
  };
}

const GroupCard: FC<GroupCardProps> = ({
  teams,
  group,
  totalGames,
  gamesOfInterest,
}) => {
  const [score, setScore] = useState({
    firstTeam: 0,
    secondTeam: 0,
  });
  const { mutateAsync } = api.tournaments.updateGame.useMutation();

  const createTournament = async (
    id: string,
    firstTeamIds: string[],
    secondTeamsIds: string[]
  ) => {
    const tournament = await mutateAsync({
      id,
      team1Score: score.firstTeam,
      team2Score: score.secondTeam,
      winnerTeamIds:
        score.firstTeam > score.secondTeam ? firstTeamIds : secondTeamsIds,
    });

    if (!tournament) {
      console.error("error creating tournament");
      return;
    }

    setScore({
      firstTeam: 0,
      secondTeam: 0,
    });
  };

  // TODO: Refactor this component
  return (
    <div className="mb-6 min-h-[20rem] min-w-[20rem] grid-cols-6 content-start gap-4 rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md xl:grid">
      <div className="col-span-3 pr-5">
        {console.log(gamesOfInterest)}
        <GroupCardHeader label="games" title={group} />
        <div className="h-full">
          {Object.entries(gamesOfInterest[group] || {})
            .sort() // Sort by key (-1, 0, 1,)
            .map(([key, game]) => {
              const gameStatus = GAME_STATUS[key];
              const isCurrentGame = gameStatus === "Current";
              const gameCount = totalGames[group] || 0;

              return (
                <div
                  key={key}
                  className={classNames(
                    !isCurrentGame && "bg-gray-200 py-1 md:py-3",
                    isCurrentGame && "bg-gray-800 py-3 text-white md:py-6",
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
                        {game && `${game?.gameOrder} of ${gameCount}`}
                      </p>
                    </div>
                    {game ? (
                      <div className="flex">
                        <div>
                          <div>
                            <p className="text-xs text-gray-400">First team</p>
                          </div>
                          <div className="flex w-full items-center">
                            {game.participant_team_1.map((team) => (
                              <p key={team.id} className="mr-2">
                                {team.name}
                              </p>
                            ))}
                          </div>
                          {isCurrentGame && (
                            <NumberInput
                              value={score.firstTeam}
                              onChange={(n) => {
                                setScore((prev) => ({ ...prev, firstTeam: n }));
                              }}
                            />
                          )}
                          {!isCurrentGame && (
                            <p className="text-gray-600">{game.team1Score}</p>
                          )}
                        </div>
                        <div className="ml-4">
                          <div>
                            <p className="text-xs text-gray-400">Second team</p>
                          </div>
                          <div className="flex w-full items-center">
                            {game.participant_team_2.map((team) => (
                              <p key={team.id} className="mr-2">
                                {team.name}
                              </p>
                            ))}
                          </div>
                          {isCurrentGame && (
                            <NumberInput
                              value={score.secondTeam}
                              onChange={(n) => {
                                setScore((prev) => ({
                                  ...prev,
                                  secondTeam: n,
                                }));
                              }}
                            />
                          )}
                          {!isCurrentGame && (
                            <p className="text-gray-600">{game.team2Score}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">no game</p>
                    )}
                  </div>

                  {isCurrentGame && (
                    <div>
                      <div className="grid h-full w-full content-end">
                        <Button
                          btnColor="outline"
                          btnTitle="Save score"
                          onClick={() => {
                            if (!game) return;

                            const firstTeamIds = game.participant_team_1.map(
                              (team) => team.id
                            );

                            const secondTeamsIds = game.participant_team_2.map(
                              (team) => team.id
                            );

                            createTournament(
                              game.id,
                              firstTeamIds,
                              secondTeamsIds
                            ).catch((err) =>
                              console.error("error creating tournament", err)
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="col-span-3">
        <GroupCardHeader label="group" title={group} />
        {teams.map((team, i) => {
          const isFirstGroup = i === 0;
          return (
            <div
              key={`${i}${team.id}`}
              className={classNames(
                !isFirstGroup && "border-t-2",
                "flex items-center justify-between py-2"
              )}
            >
              <p>{team.name}</p>
              <p>{team.score}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupCard;
