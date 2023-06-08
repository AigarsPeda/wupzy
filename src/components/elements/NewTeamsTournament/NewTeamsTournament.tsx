import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import Input from "~/components/elements/Input/Input";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewTeamsType } from "~/types/tournament.types";
import getOrdinal from "~/utils/getOrdinal";

interface NewTeamsTournamentProps {
  isVisible: boolean;
  teams: NewTeamsType[];
}

const NewTeamsTournament: FC<NewTeamsTournamentProps> = ({
  teams,
  isVisible,
}) => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <SlidingAnimationLayout isLeftSide>
            <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
              Teams
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {teams.map((team) => {
                return (
                  <div className="sm:col-span-4" key={team.id}>
                    <Input
                      inputLabel={`${team.id}${getOrdinal(team.id)} player`}
                      inputFor="Tournaments Name"
                      inputVal={team.name}
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

export default NewTeamsTournament;
