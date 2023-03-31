import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import SmallButton from "components/elements/SmallButton/SmallButton";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { GamesMapType } from "types/game.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import compareMapsGameOrder from "utils/compareMapsGameOrder";
import createGamesMap from "utils/createGamesMap";
import sortMapKeys from "utils/sortMapKeys";

interface EditTournamentGameOrderProps {
  group: string;
  tournamentId: string;
  handleCancelClick: () => void;
}

const EditTournamentGameOrder: FC<EditTournamentGameOrderProps> = ({
  group,
  tournamentId,
  handleCancelClick,
}) => {
  const [parent] = useAutoAnimate();
  const { windowSize } = useWindowSize();
  const [isOrderEdited, setIsOrderEdited] = useState(false);
  const [gamesState, setGamesState] = useState<GamesMapType>(new Map());
  const { data: games, refetch: refetchGames } =
    api.tournaments.getTournamentGames.useQuery({ group, tournamentId });
  const { mutateAsync: updateGameOrder } =
    api.tournaments.updateGameOrder.useMutation({
      onSuccess: async () => {
        await refetchGames();
        handleCancelClick();
      },
    });

  const handleGameOrderChange = (id: string, order: number, group: string) => {
    const newGamesState = new Map(gamesState);
    const games = newGamesState.get(group);

    if (!games) return;

    const game = games.find((game) => game.id === id);
    if (!game) return;

    game.gameOrder = order;

    const newInsertIndex = order - 1;
    const newGames = games.filter((game) => game.id !== id);

    newGames.splice(newInsertIndex, 0, game);

    // change game order for all games after the new game
    newGames.forEach((game, i) => {
      game.gameOrder = i + 1;
    });

    newGamesState.set(group, newGames);
    setGamesState(newGamesState);
  };

  const handleGameOrderSave = async () => {
    const games = gamesState.get(group);

    if (!games) return;

    await updateGameOrder({ games });
  };

  useEffect(() => {
    if (!games) return;
    setIsOrderEdited(compareMapsGameOrder(group, games.games, gamesState));
  }, [group, games, gamesState]);

  useEffect(() => {
    if (!games) return;
    setGamesState(sortMapKeys(createGamesMap(games.games)));
  }, [games]);

  return (
    <div>
      <div
        className="overflow-y-auto py-5"
        style={
          windowSize.width && windowSize.width > 650
            ? { height: "calc(100vh - 17rem)" }
            : { height: "calc(100vh - 14rem)" }
        }
      >
        {[...gamesState].map(([group, games]) => {
          return (
            <div
              id="group"
              key={group}
              ref={parent}
              className="relative mx-auto w-[450px]"
            >
              {games.map((game, i) => {
                const gameOrder = i + 1;
                const isDraw = game.team1Score === game.team2Score;
                const isFirstTeamWinner = game.team1Score > game.team2Score;
                const isSecondTeamWinner = game.team2Score > game.team1Score;
                const isWinner = game.winners.length > 0;

                const prevGame = games[i - 1];

                const isPrevGameWinner = prevGame
                  ? prevGame.winners.length > 0
                  : false;

                return (
                  <div
                    key={game.id}
                    className="mx-auto mb-2 flex rounded-md bg-gray-100 py-2 px-2"
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
                              btnTitle={<IoIosArrowUp className="h-4 w-4" />}
                              btnClassNames="h-6 w-6 mb-2"
                              isDisabled={isWinner || isPrevGameWinner}
                              handleClick={() => {
                                handleGameOrderChange(
                                  game.id,
                                  gameOrder - 1,
                                  group
                                );
                              }}
                            />
                          )}
                          {i !== games.length - 1 && (
                            <SmallButton
                              btnTitle={<IoIosArrowDown className="h-4 w-4" />}
                              btnClassNames="h-6 w-6"
                              isDisabled={isWinner}
                              handleClick={() => {
                                handleGameOrderChange(
                                  game.id,
                                  gameOrder + 1,
                                  group
                                );
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
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end py-2">
        <Button
          btnClass="mr-4"
          btnTitle="Cancel"
          btnColor="outline"
          onClick={handleCancelClick}
        />
        <Button
          btnTitle="Save"
          btnColor="black"
          isDisabled={!isOrderEdited}
          onClick={() => {
            handleGameOrderSave().catch((err) =>
              console.error("Error saving game order: ", err)
            );
          }}
        />
      </div>
    </div>
  );
};

export default EditTournamentGameOrder;
