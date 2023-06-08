import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import { type HandleInputChangeType } from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import AddingToListAnimationLayout from "~/components/layout/AddingToListAnimationLayout/AddingToListAnimationLayout";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewPlayerType } from "~/types/tournament.types";
import getOrdinal from "~/utils/getOrdinal";

interface NewKingTournamentProps {
  isVisible: boolean;
  players: NewPlayerType[];
  handleAddPlayer: () => void;
  handleInputChange: ({ id, name }: HandleInputChangeType) => void;
}

const NewKingTournament: FC<NewKingTournamentProps> = ({
  players,
  isVisible,
  handleAddPlayer,
  handleInputChange,
}) => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <SlidingAnimationLayout>
            <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
              King players
            </h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {players.map((player, i) => {
                const label = `${player.id}${getOrdinal(player.id)} player`;
                return (
                  <AddingToListAnimationLayout key={player.id} index={i}>
                    <Input
                      inputFor={label}
                      inputLabel={label}
                      inputVal={player.name}
                      handleInputChange={(str) => {
                        handleInputChange({
                          name: str,
                          id: player.id,
                        });
                      }}
                    />
                  </AddingToListAnimationLayout>
                );
              })}
            </ul>
            <div className="mt-6">
              <Button
                btnSize="sm"
                btnTitle={<HiOutlinePlus className="h-5 w-5" />}
                handleClick={handleAddPlayer}
              />
            </div>
          </SlidingAnimationLayout>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewKingTournament;
