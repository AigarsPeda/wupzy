import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import Input from "~/components/elements/Input/Input";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewPlayerType } from "~/types/tournament.types";
import getOrdinal from "~/utils/getOrdinal";

interface NewKingTournamentProps {
  isVisible: boolean;
  players: NewPlayerType[];
}

const NewKingTournament: FC<NewKingTournamentProps> = ({
  players,
  isVisible,
}) => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <SlidingAnimationLayout>
            <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
              King players
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {players.map((player) => {
                const label = `${player.id}${getOrdinal(player.id)} player`;
                return (
                  <div className="sm:col-span-4" key={player.id}>
                    <Input
                      inputFor={label}
                      inputLabel={label}
                      inputVal={player.name}
                      handleInputChange={(str) => {
                        console.log(str);
                        // setNewTournament({ ...newTournament, name: str });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </SlidingAnimationLayout>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewKingTournament;
