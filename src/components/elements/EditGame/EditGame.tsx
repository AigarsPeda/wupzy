import { Fragment, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import TextButton from "~/components/elements/TextButton/TextButton";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import useGame from "~/hooks/useGame";
import { GameSets, type GameType } from "~/types/tournament.types";

interface EditGameProps {
  gameId: string;
  handleModalClose: () => void;
}

const EditGame: FC<EditGameProps> = ({ gameId, handleModalClose }) => {
  const { game, mutate, setGame, isLoading } = useGame(
    gameId,
    handleModalClose
  );

  const firstTeamName = game?.teamOne?.players
    .map((player) => player.name)
    .join(" / ");

  const secondTeamName = game?.teamTwo?.players
    .map((player) => player.name)
    .join(" / ");

  return (
    <ModalLayout
      isMargin
      isFullScreen
      bgColor="gray"
      isModalVisible={Boolean(game)}
      handleCancelClick={handleModalClose}
      header={
        <div className="mb-4">
          <h1 className="text-3xl">Edit game</h1>
          <div className="flex space-x-1">
            <p className="rounded-md font-primary text-xs font-normal capitalize text-gray-500">
              Game {game?.order}
            </p>
            <p className="rounded-md font-primary text-xs font-normal capitalize text-gray-500">
              Round {game?.round}
            </p>
          </div>
        </div>
      }
    >
      <div className="mx-auto flex min-h-[80%] max-w-lg flex-col justify-between rounded-md bg-white pb-4 pl-4 pr-4 pt-4 shadow md:mt-6 md:min-h-[55%]">
        <div>
          <div className="grid grid-cols-11 md:gap-x-3">
            <div className="col-span-1 flex w-full items-center">
              <p className="font-primary text-xs text-gray-900"></p>
            </div>
            <div className="col-span-5 justify-center text-center">
              <Tooltip
                isNowrap
                content={game?.teamOne?.name || firstTeamName || ""}
              >
                <p className="truncate font-primary text-gray-900">
                  {game?.teamOne?.name || firstTeamName}
                </p>
              </Tooltip>
            </div>
            <div className="col-span-5 text-center">
              <Tooltip
                isNowrap
                content={game?.teamTwo?.name || secondTeamName || ""}
              >
                <p className="truncate font-primary text-gray-900">
                  {game?.teamTwo?.name || secondTeamName}
                </p>
              </Tooltip>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-11 gap-x-3 gap-y-5">
            {game &&
              Object.entries(GameSets.parse(game?.gameSets)).map(
                ([key, value], i) => {
                  return (
                    <Fragment key={i}>
                      <div className="text-center">
                        <p className="flex h-full items-center justify-center font-primary text-xs text-gray-900">
                          Set {key}
                        </p>
                      </div>
                      <div className="col-span-5 text-center">
                        <NumberInput
                          isFullWidth
                          value={value.teamOne || 0}
                          onChange={(num) => {
                            const teamTwoScore = game.gameSets[key]?.teamTwo;

                            const newGame: GameType = {
                              ...game,
                              gameSets: {
                                ...game?.gameSets,
                                [key]: {
                                  ...game?.gameSets[key],
                                  teamOne: num,
                                  teamTwo: teamTwoScore || 0,
                                },
                              },
                            };

                            setGame(newGame);
                          }}
                        />
                      </div>
                      <div className="col-span-5 text-center">
                        <NumberInput
                          isFullWidth
                          value={value.teamTwo || 0}
                          onChange={(num) => {
                            const teamOneScore = game.gameSets[key]?.teamOne;

                            const newGame: GameType = {
                              ...game,
                              gameSets: {
                                ...game.gameSets,
                                [key]: {
                                  ...game.gameSets[key],
                                  teamTwo: num,
                                  teamOne: teamOneScore || 0,
                                },
                              },
                            };

                            setGame(newGame);
                          }}
                        />
                      </div>
                    </Fragment>
                  );
                }
              )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <TextButton title="Cancel" handleClick={handleModalClose} />
          <div className="w-20">
            <Button
              size="sm"
              title="Save"
              type="button"
              isLoading={isLoading}
              handleClick={() => {
                if (!game) return;

                mutate({
                  game,
                });
              }}
            />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default EditGame;
