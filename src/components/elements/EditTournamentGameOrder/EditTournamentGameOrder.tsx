import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import getWinsPerTeam from "components/elements/GroupCard/utils/getWinsPerTeam";
import SmallButton from "components/elements/SmallButton/SmallButton";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { GamesMapType } from "types/game.types";
import { GameSets } from "types/game.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import compareMapsGameOrder from "utils/compareMapsGameOrder";
import createMap from "utils/createMap";
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
    api.tournaments.getAllTournamentGames.useQuery({ group, tournamentId });
  const {
    isError,
    mutateAsync: updateGameOrder,
    isLoading: isLoadingUpdateGameOrder,
  } = api.tournaments.updateGameOrder.useMutation({
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
    setGamesState(sortMapKeys(createMap(games.games)));
  }, [games]);

  return (
    <div>
      <div
        className="overflow-y-auto py-5"
        style={
          windowSize.width && windowSize.width > 650
            ? { height: "calc(100vh - 14.5rem)" }
            : { height: "calc(100vh - 14rem)" }
        }
      >
        {[...gamesState].map(([group, games]) => {
          return (
            <div
              id="group"
              key={group}
              ref={parent}
              className="relative mx-auto"
            >
              {games.map((game, i) => {
                const gameOrder = i + 1;
                const isDraw = game.team1Score === game.team2Score;
                const isFirstTeamWinner =
                  (game.team1Score || 0) > (game.team2Score || 0);
                const isSecondTeamWinner =
                  (game.team2Score || 0) > (game.team1Score || 0);
                const isWinner = game.winners.length > 0;

                const prevGame = games[i - 1];
                const prevGamesSets = prevGame?.gameSets;
                const prevFinishedGames = prevGamesSets
                  ? GameSets.parse(prevGamesSets)
                  : {};

                const {
                  firstTeamWins: prevFirstTeamWins,
                  secondTeamWins: secondFirstTeamWins,
                } = getWinsPerTeam(prevFinishedGames);

                const isPrevGameIsStarted =
                  prevFirstTeamWins > 0 || secondFirstTeamWins > 0;

                const gameSets = game.gameSets;
                const finishedGames = gameSets ? GameSets.parse(gameSets) : {};

                const { firstTeamWins, secondTeamWins } =
                  getWinsPerTeam(finishedGames);

                return (
                  <div
                    key={game.id}
                    className="mx-auto mb-2 flex rounded-md bg-gray-100 px-2 py-2"
                  >
                    <div
                      className={classNames(
                        "mr-3 grid w-20 place-content-center border-r-2 pr-2 md:mb-0 md:px-2"
                      )}
                    >
                      <div className="flex w-full items-center justify-center">
                        <div className="mr-3 text-2xl">
                          <p>{`${gameOrder}`}</p>
                        </div>
                        <div className="grid place-content-center">
                          {i !== 0 && (
                            <SmallButton
                              btnClassNames="h-6 w-6 mb-2"
                              isDisabled={
                                isWinner ||
                                firstTeamWins > 0 ||
                                secondTeamWins > 0 ||
                                isPrevGameIsStarted
                              }
                              btnTitle={<IoIosArrowUp className="h-4 w-4" />}
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
                              isDisabled={
                                isWinner ||
                                firstTeamWins > 0 ||
                                secondTeamWins > 0
                              }
                              btnClassNames="h-6 w-6"
                              btnTitle={<IoIosArrowDown className="h-4 w-4" />}
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
                    <div className="flex w-full">
                      <div className="w-full">
                        <DisplayTeams
                          team={game.team1.participants}
                          infoScore={firstTeamWins.toString()}
                          isWinner={isFirstTeamWinner && !isDraw}
                          teamName={game.team1.name || undefined}
                        />
                      </div>
                      <div className="w-full">
                        <DisplayTeams
                          team={game.team2.participants}
                          infoScore={secondTeamWins.toString()}
                          teamName={game.team2.name || undefined}
                          isWinner={isSecondTeamWinner && !isDraw}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        {isError && (
          <ErrorMessage message="Something went wrong. Please try again." />
        )}
      </div>
      <div className="flex items-end justify-end py-2">
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
          isLoading={isLoadingUpdateGameOrder}
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
