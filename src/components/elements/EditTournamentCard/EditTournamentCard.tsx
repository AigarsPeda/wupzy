import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditGroupDropdown from "components/elements/EditGroupDropdown/EditGroupDropdown";
import EditParticipant from "components/elements/EditParticipant/EditParticipant";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import type { FC } from "react";
import type { ParticipantMapType, ParticipantType } from "types/team.types";
import classNames from "utils/classNames";
import { getKeys } from "utils/teamsMapFunctions";

interface EditTournamentCardProps {
  groupToSmall: string[];
  teamsMap: ParticipantMapType;
  changedParticipantsIds: string[];
  handleCancelDeleteTeam: () => void;
  teamToDelete: ParticipantType | null;
  handleStartAddTeam: (str: string) => void;
  handleEditGroupGame: (group: string) => void;
  setTeamToDelete: (team: ParticipantType) => void;
  resetNameChange: (participant: ParticipantType) => void;
  handleDeleteTeam: (team: ParticipantType) => Promise<void>;
  handleParticipantUpdate: (participant: ParticipantType) => Promise<void>;
  handleParticipantNameChange: (team: ParticipantType, newName: string) => void;
  handleGroupChange: (
    team: ParticipantType,
    oldGroup: string,
    newGroup: string
  ) => void;
}

const EditTournamentCard: FC<EditTournamentCardProps> = ({
  teamsMap,
  groupToSmall,
  teamToDelete,
  resetNameChange,
  setTeamToDelete,
  handleDeleteTeam,
  handleGroupChange,
  handleStartAddTeam,
  handleEditGroupGame,
  handleCancelDeleteTeam,
  changedParticipantsIds,
  handleParticipantUpdate,
  handleParticipantNameChange,
}) => {
  const [parent] = useAutoAnimate();

  return (
    <>
      {[...teamsMap].map(([group, participants]) => {
        const isErrorMessageVisible = groupToSmall.includes(group);
        const isMoreThanOneGroup = getKeys(teamsMap).length > 1;

        return (
          <div
            key={`${group}`}
            className={classNames(
              isErrorMessageVisible && "border-2 border-red-500",
              "rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
            )}
          >
            <div className="flex justify-end">
              <EditGroupDropdown
                handleEditGroupGame={() => {
                  handleEditGroupGame(group);
                }}
                handleStartAddTeam={() => {
                  handleStartAddTeam(group);
                }}
              />
            </div>
            <div
              ref={parent}
              className={classNames(
                "relative ml-2 grid max-h-[30rem] min-h-[17rem] min-w-[9.375rem] grid-cols-1 content-start overflow-y-auto"
              )}
            >
              <EditTournamentHeader
                group={group}
                isMoreThanOneGroup={isMoreThanOneGroup}
              />
              {participants.map((participant, i) => {
                const isChanged = changedParticipantsIds.includes(
                  participant.id
                );

                const isLastThree = i >= participants.length - 3;

                return (
                  <EditParticipant
                    group={group}
                    key={participant.id}
                    isChanged={isChanged}
                    teamsByGroup={teamsMap}
                    isLastThree={isLastThree}
                    participant={participant}
                    teamToDelete={teamToDelete}
                    resetNameChange={resetNameChange}
                    setTeamToDelete={setTeamToDelete}
                    handleDeleteTeam={handleDeleteTeam}
                    handleGroupChange={handleGroupChange}
                    handleCancelDeleteTeam={handleCancelDeleteTeam}
                    handleParticipantUpdate={handleParticipantUpdate}
                    handleParticipantNameChange={handleParticipantNameChange}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              {isErrorMessageVisible && (
                <p className="text-xs text-red-500">
                  Group don&apos;t have enough teams. You need at least 4 teams.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EditTournamentCard;
