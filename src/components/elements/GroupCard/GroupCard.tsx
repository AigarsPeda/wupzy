import type { ActivesGameType } from "components/containers/GroupCardContainer/GroupCardContainer";
import GroupCardHeader from "components/elements/GroupCardHeader/GroupCardHeader";
import type { FC } from "react";
import type { ParticipantsType } from "types/team.types";
import classNames from "utils/classNames";

interface GroupCardProps {
  group: string;
  teams: ParticipantsType[];
  createGamesOfInterest: ActivesGameType;
}
const GAME_STATUS: {
  [key: string]: string;
} = {
  "1": "Next",
  "0": "Current",
  "-1": "Previous",
} as const;

const GroupCard: FC<GroupCardProps> = ({
  teams,
  group,
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
    <div className="mb-6 grid min-h-[20rem] min-w-[20rem] grid-cols-6 content-start gap-4 rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md">
      <div className="col-span-3 pr-5">
        <GroupCardHeader label="games" title={group} />
        <div className="h-full max-h-[30rem] overflow-y-auto">
          {Object.entries(createGamesOfInterest[group] || {})
            .sort() // Sort by key (-1, 0, 1,)
            .map(([key, games]) => {
              const gameStatus = GAME_STATUS[key];

              return (
                <div
                  key={key}
                  className={classNames(
                    gameStatus !== "Current" && "bg-gray-200 py-3 px-2",
                    gameStatus === "Current" &&
                      "bg-gray-800 py-6 px-2 text-white",
                    "mb-3 flex rounded-md"
                  )}
                >
                  <p className="mr-3 w-20 border-r-2 border-gray-100 px-2">
                    {gameStatus}
                  </p>
                  {games ? (
                    <div className={classNames("flex")}>
                      {games.participant_team_1.map((team) => (
                        <p key={team.id} className="ml-2">
                          {team.name}
                        </p>
                      ))}

                      <p className="mx-3 text-gray-400">vs</p>

                      {games.participant_team_2.map((team) => (
                        <p key={team.id} className="ml-2">
                          {team.name}
                        </p>
                      ))}
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
        {/* {console.log("games from API ---->", group, games?.games)} */}
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
