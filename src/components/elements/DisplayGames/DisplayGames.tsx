import { type FC } from "react";
import { type GameType } from "~/types/tournament.types";
import NumberInput from "../NumberInput/NumberInput";
import newTournament from "../../../pages/new-tournament";
import Button from "../Button/Button";
import { BiPlus } from "react-icons/bi";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

interface DisplayGamesProps {
  games: GameType[] | undefined;
}

const DisplayGames: FC<DisplayGamesProps> = ({ games }) => {
  return (
    <div>
      <div className="mb-2 mt-6">
        <p className="font-primary font-medium text-gray-500">Games</p>
      </div>
      <div className="relative flex overflow-x-auto">
        <div className="ml-4 flex w-full space-x-3 overflow-x-auto py-5 md:ml-0">
          {games?.map((game) => {
            return (
              <div
                key={game.id}
                className="rounded-md border border-gray-300 bg-white p-3"
              >
                <div className="w-72">
                  <div className="mb-2">
                    <div className="grid grid-cols-12 pt-2">
                      <div className="col-span-5 text-right">
                        <p className="truncate whitespace-nowrap font-primary text-lg  uppercase">
                          {game?.teamOne?.name}
                        </p>
                      </div>
                      <div className="col-span-2 text-center">
                        <p className="text-gray-400 ">vs</p>
                      </div>
                      <div className="col-span-5 text-left">
                        <p className="truncate whitespace-nowrap font-primary text-lg  uppercase">
                          {game?.teamTwo?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pb-4">
                    <NumberInput
                      value={game.teamOneScore}
                      onChange={() => {
                        console.log("hello");
                      }}
                    />
                    <NumberInput
                      value={game.teamOneScore}
                      onChange={() => {
                        console.log("hello");
                      }}
                    />
                  </div>
                  <div>
                    <SecondaryButton
                      type="button"
                      color="dark"
                      isFullWidth
                      title="Save Score"
                      handleClick={() => console.log("hello")}
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
