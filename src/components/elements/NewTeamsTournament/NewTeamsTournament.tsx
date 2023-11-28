import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import { BiPlus } from "react-icons/bi";
import Button from "~/components/elements/Button/Button";
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
import classNames from "~/utils/classNames";
import getOrdinal from "~/utils/getOrdinal";

interface NewTeamsTournamentProps {
  isVisible: boolean;
  isFullWidth?: boolean;
  teams: NewTeamsType[];
  teamsNameVisible?: string;
  handleAddTeam?: () => void;
  addPlayerToTeam: ({ teamId }: AddPlayerToTeamType) => void;
  updateTeamsTeamName: ({ id, key, value }: HandleInputChangeType) => void;
  updateTeamsPlayerName: ({
    id,
    name,
    teamId,
  }: HandleTeamsPlayerNameUpdateType) => void;
}

const NewTeamsTournament: FC<NewTeamsTournamentProps> = ({
  teams,
  isVisible,
  isFullWidth,
  teamsNameVisible,
  handleAddTeam,
  addPlayerToTeam,
  updateTeamsTeamName,
  updateTeamsPlayerName,
}) => {
  return (
    <>
      <AnimatePresence key="NewTeamsTournament">
        {isVisible && (
          <SlidingAnimationLayout>
            {/* <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
              Teams
            </h2> */}
            <ul className={classNames("w-full")}>
              {teams.map((team, i) => {
                const label = `${i + 1}${getOrdinal(i + 1)} team`;

                return (
                  <AddingToListAnimationLayout
                    index={i}
                    key={team.id}
                    zIndex={teams.length - i}
                  >
                    <li className={classNames("mb-14 w-full")} key={team.id}>
                      <div>
                        <Input
                          inputFor={label}
                          inputVal={team.name || ""}
                          inputLabel={teamsNameVisible || label}
                          handleInputChange={(str) => {
                            updateTeamsTeamName({
                              // name: str,
                              key: "name",
                              value: str,
                              id: team.id,
                            });
                          }}
                        />
                      </div>
                      <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        {team.players.map((player, i) => {
                          const label = `${i + 1}${getOrdinal(i + 1)} player`;
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

                      <div className="flex justify-end">
                        <div className="relative mt-2 w-24">
                          <Button
                            size="sm"
                            type="button"
                            title="Add player"
                            color="transparent"
                            handleClick={() =>
                              addPlayerToTeam({ teamId: team.id })
                            }
                          />
                          <div>
                            <span className="absolute bottom-1 left-1/2 block h-0.5 w-20 -translate-x-1/2 transform rounded-full bg-gray-600"></span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </AddingToListAnimationLayout>
                );
              })}
            </ul>
            {handleAddTeam && (
              <div className="mt-6">
                <SecondaryButton
                  type="button"
                  title="Add Team"
                  icon={<BiPlus className="mr-2 h-5 w-5" />}
                  handleClick={handleAddTeam}
                />
              </div>
            )}
          </SlidingAnimationLayout>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewTeamsTournament;
