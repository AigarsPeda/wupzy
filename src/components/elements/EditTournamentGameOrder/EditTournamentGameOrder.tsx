import GridLayout from "components/layouts/GridLayout/GridLayout";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect } from "react";
import { api } from "utils/api";
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
              <div key={group}>
                <h2>{group}</h2>
                <ul>
                  {games.map((game) => {
                    return (
                      <li key={game.id}>
                        <p>{game.id}</p>
                        <p>{game.team1Id}</p>
                        <p>{game.team2Id}</p>
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
