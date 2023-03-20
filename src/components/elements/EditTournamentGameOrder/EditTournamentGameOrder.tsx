import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect } from "react";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createGamesMap from "utils/createGamesMap";
import sortMapKeys from "utils/sortMapKeys";

interface EditTournamentGameOrderProps {
  tournamentId: string;
}

const EditTournamentGameOrder: FC<EditTournamentGameOrderProps> = ({
  tournamentId,
}) => {
  const { windowSize } = useWindowSize();
  const { data: games } = api.tournaments.getTournamentGames.useQuery(
    { tournamentId }
    // { enabled: isDisplayAllGames }
  );

  const handleGameOrderChange = (id: string, order: number) => {
    console.log("id --->", id);
    console.log("order --->", order);
  };

  useEffect(() => {
    console.log("--------->", createGamesMap(games?.games || []));
    console.log("games --->", games);
  }, [games]);

  return (
    <div
      className="overflow-y-auto"
      style={
        windowSize.width && windowSize.width > 650
          ? { maxHeight: "calc(100vh - 17rem)" }
          : { maxHeight: "calc(100vh - 14rem)" }
      }
    >
      <GridLayout isGap minWith="350">
        {[...sortMapKeys(createGamesMap(games?.games || []))].map(
          ([group, games]) => {
            return (
              <div key={group} className="px-1">
                <h2>{group}</h2>
                <ul>
                  {games.map((game, i) => {
                    const gameOrder = i + 1;
                    const isDraw = game.team1Score === game.team2Score;
                    const isFirstTeamWinner = game.team1Score > game.team2Score;
                    const isSecondTeamWinner =
                      game.team2Score > game.team1Score;
                    return (
                      <li
                        key={game.id}
                        className="mb-2 flex rounded-md bg-gray-100 py-2 px-2"
                      >
                        <div
                          className={classNames(
                            "mb-3 flex w-20 items-center justify-center border-b-2 md:mr-3 md:mb-0 md:border-b-0 md:border-r-2 md:px-2"
                          )}
                        >
                          <p className="">{`${gameOrder}`}</p>
                        </div>
                        <DisplayTeams
                          infoScore={game.team1Score}
                          team={game.team1.participants}
                          isWinner={isFirstTeamWinner && !isDraw}
                        />
                        <DisplayTeams
                          infoScore={game.team2Score}
                          team={game.team2.participants}
                          isWinner={isSecondTeamWinner && !isDraw}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
        )}
      </GridLayout>
    </div>
  );
};

export default EditTournamentGameOrder;
