import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import FieldsDropdown from "~/components/elements/FieldsDropdown/FieldsDropdown";
import Input from "~/components/elements/Input/Input";
import { type HandleInputChangeType } from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import AddingToListAnimationLayout from "~/components/layout/AddingToListAnimationLayout/AddingToListAnimationLayout";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import {
  type KeyNewPlayerType,
  type NewPlayerType,
} from "~/types/tournament.types";
import classNames from "~/utils/classNames";
import getOrdinal from "~/utils/getOrdinal";

interface NewKingTournamentProps {
  isVisible: boolean;
  players: NewPlayerType[];
  playerNameVisible?: string;
  handleAddPlayer?: () => void;
  removeFieldFromPlayer?: ({
    id,
    field,
  }: {
    id: string;
    field: KeyNewPlayerType;
  }) => void;
  handleKingsPlayerName: ({ id, key, value }: HandleInputChangeType) => void;
  addFieldToPlayer?: ({
    id,
    field,
  }: {
    id: string;
    field: KeyNewPlayerType;
  }) => void;
}

const NewKingTournament: FC<NewKingTournamentProps> = ({
  players,
  isVisible,
  playerNameVisible,
  handleAddPlayer,
  addFieldToPlayer,
  handleKingsPlayerName,
  // removeFieldFromPlayer,
}) => {
  return (
    <AnimatePresence key="NewKingTournament">
      {isVisible && (
        <SlidingAnimationLayout>
          {/* <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
            King players
          </h2> */}
          <ul className={classNames("flex w-full flex-col space-y-5")}>
            {players.map((player, i) => {
              const keys = Object.keys(player);
              const isEmailKey = keys.includes("email");
              const isPhoneKey = keys.includes("phone");
              const label = `${i + 1}${getOrdinal(i + 1)} player`;

              return (
                <AddingToListAnimationLayout
                  index={i}
                  key={player.id}
                  zIndex={players.length - i}
                >
                  <li className="w-full">
                    <div className="relative w-full">
                      <Input
                        inputFor={label}
                        inputVal={player.name}
                        inputLabel={playerNameVisible || label}
                        handleInputChange={(str) => {
                          handleKingsPlayerName({
                            key: "name",
                            value: str,
                            id: player.id,
                          });
                        }}
                      />
                      <div className="absolute right-0 top-0">
                        {addFieldToPlayer && (
                          <FieldsDropdown
                            objectKeys={keys}
                            handleOptionClick={(field) => {
                              addFieldToPlayer({
                                field,
                                id: player.id,
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {isEmailKey && (
                        <AddingToListAnimationLayout index={i + 1} isFlex>
                          <div className="mt-2 w-full">
                            <Input
                              isSmall
                              inputFor="Email"
                              inputLabel="Email"
                              inputType="email"
                              inputVal={player.email || ""}
                              handleInputChange={(str) => {
                                handleKingsPlayerName({
                                  value: str,
                                  key: "email",
                                  id: player.id,
                                });
                              }}
                            />
                          </div>
                        </AddingToListAnimationLayout>
                      )}
                      {isPhoneKey && (
                        <AddingToListAnimationLayout index={i + 1} isFlex>
                          <div className="mt-2 w-full">
                            <Input
                              isSmall
                              inputFor="Phone"
                              inputLabel="Phone"
                              inputVal={player.phone || ""}
                              handleInputChange={(str) => {
                                handleKingsPlayerName({
                                  value: str,
                                  key: "phone",
                                  id: player.id,
                                });
                              }}
                            />
                          </div>
                        </AddingToListAnimationLayout>
                      )}
                    </div>
                    {/* <div>
                      {addFieldToPlayer && (
                        <FieldsDropdown
                          objectKeys={keys}
                          handleOptionClick={(field) => {
                            addFieldToPlayer({
                              field,
                              id: player.id,
                            });
                          }}
                        />
                      )}
                    </div> */}
                  </li>
                </AddingToListAnimationLayout>
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
