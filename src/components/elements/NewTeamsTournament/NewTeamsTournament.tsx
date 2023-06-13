import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import Input from "~/components/elements/Input/Input";
import {
  type AddPlayerToTeamType,
  type HandleInputChangeType,
  type HandleTeamsPlayerNameUpdateType,
} from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import AddingToListAnimationLayout from "~/components/layout/AddingToListAnimationLayout/AddingToListAnimationLayout";
import SlidingAnimationLayout from "~/components/layout/SlidingAnimationLayout/SlidingAnimationLayout";
import { type NewTeamsType } from "~/types/tournament.types";
import getOrdinal from "~/utils/getOrdinal";

interface NewTeamsTournamentProps {
  isVisible: boolean;
  teams: NewTeamsType[];
  handleAddTeam: () => void;
  addPlayerToTeam: ({ teamId }: AddPlayerToTeamType) => void;
  updateTeamsTeamName: ({ id, name }: HandleInputChangeType) => void;
  updateTeamsPlayerName: ({
    id,
    name,
    teamId,
  }: HandleTeamsPlayerNameUpdateType) => void;
}

const NewTeamsTournament: FC<NewTeamsTournamentProps> = ({
  teams,
  isVisible,
  handleAddTeam,
  addPlayerToTeam,
  updateTeamsTeamName,
  updateTeamsPlayerName,
}) => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <SlidingAnimationLayout>
            <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
              Teams
            </h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {teams.map((team, index) => {
                const label = `${team.id}${getOrdinal(
                  parseInt(team.id, 10)
                )} team`;
                return (
                  <li className="font-normal sm:col-span-4" key={team.id}>
                    <AddingToListAnimationLayout index={index}>
                      <Input
                        inputFor={label}
                        inputLabel={label}
                        inputVal={team.name}
                        handleInputChange={(str) => {
                          updateTeamsTeamName({
                            name: str,
                            id: team.id,
                          });
                        }}
                      />

                      <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        {team.players.map((player, i) => {
                          const label = `${player.id}${getOrdinal(
                            parseInt(player.id, 10)
                          )} player`;
                          return (
                            <li
                              className="font-normal sm:col-span-2"
                              key={`${team.id}${i}`}
                            >
                              <AddingToListAnimationLayout index={i}>
                                <Input
                                  inputFor={label}
                                  inputLabel={label}
                                  inputVal={player.name}
                                  handleInputChange={(str) => {
                                    updateTeamsPlayerName({
                                      name: str,
                                      id: player.id,
                                      teamId: team.id,
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
                          title="Add player"
                          handleClick={() =>
                            addPlayerToTeam({ teamId: team.id })
                          }
                        />
                      </div>
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
                handleClick={handleAddTeam}
              />
            </div>
          </SlidingAnimationLayout>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewTeamsTournament;
