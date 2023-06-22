import { Fragment, useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import ModalLayout from "~/components/elements/ModalLayout/ModalLayout";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import { GameSets, type GameType } from "~/types/tournament.types";
import { api } from "~/utils/api";

interface EditGameProps {
  gameId: string;
  handleModalClose: () => void;
}

const EditGame: FC<EditGameProps> = ({ gameId, handleModalClose }) => {
  const [game, setGame] = useState<GameType | undefined>(undefined);
  const { data } = api.game.getGame.useQuery(
    { id: gameId },
    { enabled: Boolean(gameId), refetchOnWindowFocus: false }
  );

  const { mutate } = api.game.updateGame.useMutation();

  useEffect(() => {
    if (data?.game && GameSets.parse(data?.game?.gameSets)) {
      const gameSets = GameSets.parse(data?.game?.gameSets);

      const newGame = {
        ...data.game,
        gameSets,
      };

      setGame(newGame);
    }
  }, [data]);

  return (
    <ModalLayout
      isFullScreen
      isModalVisible={Boolean(game)}
      handleCancelClick={handleModalClose}
      header={
        <div className="mb-4">
          <h1 className="text-3xl"> Edit Game</h1>
          <div className="flex space-x-1">
            <p className="rounded-md font-primary text-xs font-normal capitalize text-pink-500">
              Game {game?.order}
            </p>
            <p className="rounded-md font-primary text-xs font-normal capitalize text-pink-500">
              Round {game?.round}
            </p>
          </div>
        </div>
      }
    >
      <div className="mx-auto max-w-sm px-2">
        <div className="grid grid-cols-12 md:gap-x-3">
          <div className="col-span-2 text-center ">
            <p className="font-primary text-gray-900">Sets</p>
          </div>
          <div className="col-span-5 text-center">
            <Tooltip isNowrap content={game?.teamOne?.name || ""}>
              <p className="truncate font-primary text-gray-900">
                {game?.teamOne?.name}
              </p>
            </Tooltip>
          </div>
          <div className="col-span-5 text-center">
            <Tooltip isNowrap content={game?.teamTwo?.name || ""}>
              <p className="truncate font-primary text-gray-900">
                {game?.teamTwo?.name}
              </p>
            </Tooltip>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-12 gap-x-3 gap-y-1">
          {game &&
            Object.entries(GameSets.parse(game?.gameSets)).map(
              ([key, value], i) => {
                return (
                  <Fragment key={i}>
                    <div className="col-span-2 text-center">
                      <p className="flex h-full items-center justify-center font-primary text-gray-900">
                        {key}:
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
          >
            Cancel
          </button>
          <Button
            size="sm"
            title="Save"
            type="button"
            handleClick={() => {
              handleModalClose();
            }}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default EditGame;
