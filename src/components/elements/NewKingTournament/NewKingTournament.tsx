import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import Input from "~/components/elements/Input/Input";
import { type HandleInputChangeType } from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import AddingToListAnimationLayout from "~/components/layout/AddingToListAnimationLayout/AddingToListAnimationLayout";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewPlayerType } from "~/types/tournament.types";
import classNames from "~/utils/classNames";
import getOrdinal from "~/utils/getOrdinal";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosOptions } from "react-icons/io";

interface NewKingTournamentProps {
  isVisible: boolean;
  isAddField?: boolean;
  isFullWidth?: boolean;
  players: NewPlayerType[];
  playerNameVisible?: string;
  handleAddPlayer?: () => void;
  handleKingsPlayerName: ({ id, name }: HandleInputChangeType) => void;
}

const NewKingTournament: FC<NewKingTournamentProps> = ({
  players,
  isVisible,
  isAddField,
  isFullWidth,
  playerNameVisible,
  handleAddPlayer,
  handleKingsPlayerName,
}) => {
  return (
    <AnimatePresence key="NewKingTournament">
      {isVisible && (
        <SlidingAnimationLayout>
          {/* <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
            King players
          </h2> */}
          <ul
            className={classNames(
              isFullWidth ? "w-full" : "flex w-full flex-col space-y-5",
            )}
          >
            {players.map((player, i) => {
              const label = `${i + 1}${getOrdinal(i + 1)} player`;
              return (
                <li key={player.id} className="w-full">
                  <AddingToListAnimationLayout index={i} isFlex>
                    <Input
                      inputFor={label}
                      inputVal={player.name}
                      inputLabel={playerNameVisible || label}
                      handleInputChange={(str) => {
                        handleKingsPlayerName({
                          name: str,
                          id: player.id,
                        });
                      }}
                    />
                    {isAddField && (
                      <button
                        type="button"
                        className="ml-2 mt-8 flex h-[2.5rem] w-[2.6rem] items-center justify-center rounded-md bg-gray-100 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
                      >
                        <IoIosOptions className="h-full w-full p-1" />
                      </button>
                    )}
                  </AddingToListAnimationLayout>
                </li>
              );
            })}
          </ul>
          {handleAddPlayer && (
            <div className="mt-6">
              <SecondaryButton
                type="button"
                title="Add player"
                icon={<BiPlus className="mr-2 h-5 w-5" />}
                handleClick={handleAddPlayer}
              />
            </div>
          )}
        </SlidingAnimationLayout>
      )}
    </AnimatePresence>
  );
};

export default NewKingTournament;
