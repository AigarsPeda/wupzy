import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import SmallButton from "components/elements/SmallButton/SmallButton";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect, useState } from "react";
import DraggableList from "react-draggable-lists";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { GamesMapType } from "types/game.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createGamesMap from "utils/createGamesMap";
import sortMapKeys from "utils/sortMapKeys";

interface EditTournamentGameOrderProps {
  group: string;
  tournamentId: string;
}

const EditTournamentGameOrder: FC<EditTournamentGameOrderProps> = ({
  group,
  tournamentId,
}) => {
  const { windowSize } = useWindowSize();
  const [gamesState, setGamesState] = useState<GamesMapType>(new Map());
  const { data: games, refetch: refetchGames } =
    api.tournaments.getTournamentGames.useQuery({ group, tournamentId });
  const { mutateAsync: updateGameOrder } =
    api.tournaments.updateGameOrder.useMutation();

  const handleGameOrderChange = async (
    id: string,
    order: number,
    group: string
  ) => {
    await updateGameOrder({ id, order, group, tournamentId });
    await refetchGames();
  };

  useEffect(() => {
    if (!games) return;

    setGamesState(sortMapKeys(createGamesMap(games.games)));
  }, [games]);

  return (
    <div
      style={
        windowSize.width && windowSize.width > 650
          ? { height: "calc(100vh - 15rem)" }
          : { height: "calc(100vh - 14rem)" }
      }
    >
      <GridLayout isGap minWith="350">
        {[...gamesState].map(([group, games]) => {
          return (
            <div key={group}>
              <h2>{group}</h2>
              <ul>
                <DraggableList width={500} height={100} rowSize={1}>
                  <div
                    className="overflow-y-auto"
                    style={
                      windowSize.width && windowSize.width > 650
                        ? { height: "calc(100vh - 17rem)" }
                        : { height: "calc(100vh - 13rem)" }
                    }
                  >
                    {games.map((game, i) => {
                      const gameOrder = i + 1;
                      const isDraw = game.team1Score === game.team2Score;
                      const isFirstTeamWinner =
                        game.team1Score > game.team2Score;
                      const isSecondTeamWinner =
                        game.team2Score > game.team1Score;

                      return (
                        <li
                          key={game.id}
                          className="mb-2 flex rounded-md bg-gray-100 py-2 px-2"
                        >
                          <div
                            className={classNames(
                              "g mb-3 grid w-20 place-content-center border-b-2 md:mr-3 md:mb-0 md:border-b-0 md:border-r-2 md:px-2"
                            )}
                          >
                            <div className="flex w-full items-center justify-center">
                              <div className="mr-3 text-2xl">
                                <p>{`${gameOrder}`}</p>
                              </div>
                              <div className="grid place-content-center">
                                {i !== 0 && (
                                  <SmallButton
                                    btnTitle={
                                      <IoIosArrowUp className="h-4 w-4" />
                                    }
                                    btnClassNames="h-6 w-6 mb-2"
                                    handleClick={() => {
                                      handleGameOrderChange(
                                        game.id,
                                        gameOrder - 1,
                                        group
                                      ).catch((e) => console.log(e));
                                    }}
                                  />
                                )}
                                {i !== games.length - 1 && (
                                  <SmallButton
                                    btnTitle={
                                      <IoIosArrowDown className="h-4 w-4" />
                                    }
                                    btnClassNames="h-6 w-6"
                                    handleClick={() => {
                                      handleGameOrderChange(
                                        game.id,
                                        gameOrder + 1,
                                        group
                                      ).catch((e) => console.log(e));
                                    }}
                                  />
                                )}
                              </div>
                            </div>
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
                  </div>
                </DraggableList>
              </ul>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default EditTournamentGameOrder;
