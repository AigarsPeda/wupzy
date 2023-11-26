import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import FieldsDropdown from "~/components/elements/FieldsDropdown/FieldsDropdown";
import Input from "~/components/elements/Input/Input";
import { type HandleInputChangeType } from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import AddingToListAnimationLayout from "~/components/layout/AddingToListAnimationLayout/AddingToListAnimationLayout";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewPlayerType } from "~/types/tournament.types";
import classNames from "~/utils/classNames";
import getOrdinal from "~/utils/getOrdinal";

interface NewKingTournamentProps {
  isVisible: boolean;
  isFullWidth?: boolean;
  players: NewPlayerType[];
  playerNameVisible?: string;
  handleAddPlayer?: () => void;
  handleKingsPlayerName: ({ id, name }: HandleInputChangeType) => void;
  addFieldToPlayer?: ({ id, field }: { id: string; field: string }) => void;
}

const NewKingTournament: FC<NewKingTournamentProps> = ({
  players,
  isVisible,
  isFullWidth,
  playerNameVisible,
  handleAddPlayer,
  addFieldToPlayer,
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
              const isEmailKey = Object.keys(player).includes("email");
              const isPhoneKey = Object.keys(player).includes("phone");
              return (
                <li
                  key={player.id}
                  className="relative w-full"
                  style={{
                    zIndex: players.length - i,
                  }}
                >
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

                    {addFieldToPlayer && (
                      <FieldsDropdown
                        handleOptionClick={(field) => {
                          addFieldToPlayer({
                            field,
                            id: player.id,
                          });
                        }}
                      />
                    )}
                  </AddingToListAnimationLayout>
                  {isEmailKey && (
                    <div className="ml-2 text-sm text-gray-500">
                      Email {player.email}
                    </div>
                  )}
                  {isPhoneKey && (
                    <div className="ml-2 text-sm text-gray-500">
                      Phone {player.phone}
                    </div>
                  )}
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
