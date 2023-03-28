import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditGroupDropdown from "components/elements/EditGroupDropdown/EditGroupDropdown";
import EditParticipant from "components/elements/EditParticipant/EditParticipant";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import type { FC } from "react";
import type { ParticipantMapType, ParticipantType } from "types/team.types";
import classNames from "utils/classNames";
import { getKeys } from "utils/teamsMapFunctions";

interface EditParticipantTournamentCardProps {
  groupToSmall: string[];
  changedParticipantsIds: string[];
  participantsByGroup: ParticipantMapType;
  handleStartAddTeam: (str: string) => void;
  handleCancelDeleteParticipants: () => void;
  participantsToDelete: ParticipantType | null;
  handleEditGroupGame: (group: string) => void;
  setParticipantsToDelete: (team: ParticipantType) => void;
  resetNameChange: (participant: ParticipantType) => void;
  handleDeleteParticipant: (team: ParticipantType) => Promise<void>;
  handleParticipantUpdate: (participant: ParticipantType) => Promise<void>;
  handleParticipantNameChange: (team: ParticipantType, newName: string) => void;
  handleGroupChange: (
    team: ParticipantType,
    oldGroup: string,
    newGroup: string
  ) => void;
}

const EditParticipantTournamentCard: FC<EditParticipantTournamentCardProps> = ({
  groupToSmall,
  resetNameChange,
  handleGroupChange,
  handleStartAddTeam,
  handleEditGroupGame,
  participantsByGroup,
  participantsToDelete,
  changedParticipantsIds,
  handleParticipantUpdate,
  handleDeleteParticipant,
  setParticipantsToDelete,
  handleParticipantNameChange,
  handleCancelDeleteParticipants,
}) => {
  const [parent] = useAutoAnimate();

  return (
    <>
      {[...participantsByGroup].map(([group, participants]) => {
        const isErrorMessageVisible = groupToSmall.includes(group);
        const isMoreThanOneGroup = getKeys(participantsByGroup).length > 1;

        return (
          <div
            key={`${group}`}
            className={classNames(
              isErrorMessageVisible && "border-2 border-red-500",
              "rounded-md border border-gray-50 bg-gray-50 px-3 py-3 shadow-md md:px-8"
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
                "relative grid max-h-[30rem] min-h-[17rem] min-w-[9.375rem] grid-cols-1 content-start overflow-y-auto md:ml-2"
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

                const isLast = i === participants.length - 1;

                return (
                  <EditParticipant
                    group={group}
                    isLast={isLast}
                    key={participant.id}
                    isChanged={isChanged}
                    participant={participant}
                    resetNameChange={resetNameChange}
                    handleGroupChange={handleGroupChange}
                    participantsByGroup={participantsByGroup}
                    participantsToDelete={participantsToDelete}
                    setParticipantsToDelete={setParticipantsToDelete}
                    handleParticipantUpdate={handleParticipantUpdate}
                    handleDeleteParticipant={handleDeleteParticipant}
                    handleParticipantNameChange={handleParticipantNameChange}
                    handleCancelDeleteParticipants={
                      handleCancelDeleteParticipants
                    }
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

export default EditParticipantTournamentCard;
