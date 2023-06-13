import { type FC } from "react";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import TeamName from "~/components/elements/TeamName/TeamName";
import { type GameType } from "~/types/tournament.types";
import {
  type HandleScoreChangTypeArgs,
  type HandleScoreSaveTypeArgs,
} from "~/types/utils.types";

interface DisplayGamesProps {
  games: GameType[] | undefined;
  handleScoreSave: ({ game }: HandleScoreSaveTypeArgs) => void;
  handleScoreChange: ({
    num,
    gameId,
    teamId,
  }: HandleScoreChangTypeArgs) => void;
}

const DisplayGames: FC<DisplayGamesProps> = ({
  games,
  handleScoreSave,
  handleScoreChange,
}) => {
  return (
    <div>
      <div className="mb-2 mt-4">
        <p className="font-primary text-xs text-gray-500">Games</p>
      </div>
      <div className="relative flex overflow-x-auto">
        <div className="ml-4 flex w-full space-x-3 overflow-x-auto pb-5 md:ml-0">
          {games?.map((game) => {
            return (
              <div
                key={game.id}
                className="rounded-md border border-gray-300 bg-gradient-to-br from-gray-100 to-white p-3 shadow-sm"
              >
                <div className="w-72">
                  <div className="mb-2">
                    <div className="grid grid-cols-12">
                      <TeamName name={game?.teamOne?.name} />
                      <div className="col-span-2 text-center">
                        <p className="content-center text-sm text-gray-300">
                          vs
                        </p>
                      </div>
                      <TeamName name={game?.teamTwo?.name} />
                    </div>
                  </div>
                  <div className="flex justify-between pb-4">
                    <NumberInput
                      value={game?.teamOneScore}
                      onChange={(num) => {
                        handleScoreChange({
                          num,
                          gameId: game?.id,
                          teamId: game?.teamOne?.id,
                        });
                        // console.log("hello", n);
                      }}
                    />
                    <NumberInput
                      value={game?.teamTwoScore}
                      onChange={(num) => {
                        handleScoreChange({
                          num,
                          gameId: game?.id,
                          teamId: game?.teamTwo?.id,
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <SecondaryButton
                      type="button"
                      color="dark"
                      title="Save"
                      handleClick={() =>
                        handleScoreSave({
                          game,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="z-1 absolute left-1 top-0 h-full w-5 bg-gradient-to-r from-gray-50 to-transparent md:-left-2" />
        <div className="z-1 absolute right-0 top-0 h-full w-5 bg-gradient-to-r from-transparent to-gray-50 md:w-14" />
      </div>
    </div>
  );
};

export default DisplayGames;
