import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import Input from "~/components/elements/Input/Input";
import { type HandleInputChangeType } from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import AddingToListAnimationLayout from "~/components/layout/AddingToListAnimationLayout/AddingToListAnimationLayout";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewPlayerType } from "~/types/tournament.types";
import getOrdinal from "~/utils/getOrdinal";

interface NewKingTournamentProps {
  isVisible: boolean;
  players: NewPlayerType[];
  handleAddPlayer: () => void;
  handleKingsPlayerName: ({ id, name }: HandleInputChangeType) => void;
}

const NewKingTournament: FC<NewKingTournamentProps> = ({
  players,
  isVisible,
  handleAddPlayer,
  handleKingsPlayerName,
}) => {
  return (
    <AnimatePresence key="NewKingTournament">
      {isVisible && (
        <SlidingAnimationLayout>
          <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
            King players
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {players.map((player, i) => {
              const label = `${i + 1}${getOrdinal(i + 1)} player`;
              return (
                <li className="font-normal sm:col-span-4" key={player.id}>
                  <AddingToListAnimationLayout index={i}>
                    <Input
                      inputFor={label}
                      inputLabel={label}
                      inputVal={player.name}
                      handleInputChange={(str) => {
                        handleKingsPlayerName({
                          name: str,
                          id: player.id,
                        });
                      }}
                    />
                  </AddingToListAnimationLayout>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <SecondaryButton
              type="button"
              title="Add Team"
              icon={<BiPlus className="mr-2 h-5 w-5" />}
              handleClick={handleAddPlayer}
            />
          </div>
        </SlidingAnimationLayout>
      )}
    </AnimatePresence>
  );
};

export default NewKingTournament;
