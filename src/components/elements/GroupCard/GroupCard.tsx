import type { ActivesGameType } from "components/containers/GroupCardContainer/GroupCardContainer";
import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import type { FC } from "react";
import type { ParticipantsType } from "types/team.types";
import classNames from "utils/classNames";
import GridLayout from "../../layouts/GridLayout/GridLayout";
import NumberInput from "../NumberInput/NumberInput";

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
  createGamesOfInterest: ActivesGameType;
  totalGames: {
    [key: string]: number;
  };
}

const GroupCard: FC<GroupCardProps> = ({
  teams,
  group,
  totalGames,
  createGamesOfInterest,
}) => {
  // TODO: Should we use useQuery here? Or just pas prev games and next games as props?
  // const { data: games } = api.tournaments.getTournamentGames.useQuery({
  //   id: tournamentId,
  //   group,
  // });

  // loop through createGamesOfInterest and find the current game
  // if there is no current game, then find the next game

  return (
    <div className="mb-6 min-h-[20rem] min-w-[20rem] grid-cols-6 content-start gap-4 rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md xl:grid">
      <div className="col-span-3 pr-5">
        <GroupCardHeader label="games" title={group} />
        <div className="h-full max-h-[30rem] overflow-y-auto">
          {Object.entries(createGamesOfInterest[group] || {})
            .sort() // Sort by key (-1, 0, 1,)
            .map(([key, games]) => {
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
                  <div className="mb-3 w-20 border-b-2 border-gray-100 md:mr-3 md:mb-0 md:border-b-0 md:border-r-2 md:px-2">
                    <p>{gameStatus}</p>
                    <p className="pb-1 text-xs text-gray-400">
                      {games && `${games?.gameOrder} of ${gameCount}`}
                    </p>
                  </div>
                  {games ? (
                    <div className="flex w-full items-center justify-between space-x-4">
                      <div>
                        <div className="flex w-full items-center">
                          {games.participant_team_1.map((team) => (
                            <p key={team.id} className="mr-2">
                              {team.name}
                            </p>
                          ))}
                        </div>
                        {isCurrentGame && <NumberInput />}
                      </div>
                      {/* <div className="">
                        <p className="text-gray-400">vs</p>
                      </div> */}
                      <div>
                        <div className="flex w-full items-center">
                          {games.participant_team_2.map((team) => (
                            <p key={team.id} className="mr-2">
                              {team.name}
                            </p>
                          ))}
                        </div>
                        {isCurrentGame && <NumberInput />}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">no game</p>
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
