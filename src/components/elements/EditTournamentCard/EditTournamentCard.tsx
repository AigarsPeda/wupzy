import Button from "components/elements/Button/Button";
import EditParticipant from "components/elements/EditParticipant/EditParticipant";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import type { FC } from "react";
import type { ParticipantType, TeamsMapType } from "types/team.types";
import classNames from "utils/classNames";
import { getKeys } from "utils/teamsMapFunctions";

interface EditTournamentCardProps {
  teamsMap: TeamsMapType;
  groupToSmall: string[];
  changedParticipantsIds: string[];
  teamToDelete: ParticipantType | null;
  handleCancelDeleteTeam: () => void;
  handleStartAddTeam: (str: string) => void;
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
  handleCancelDeleteTeam,
  changedParticipantsIds,
  handleParticipantUpdate,
  handleParticipantNameChange,
}) => {
  return (
    <>
      {[...teamsMap].map(([group, participants], i) => {
        const isErrorMessageVisible = groupToSmall.includes(group);
        const isMoreThanOneGroup = getKeys(teamsMap).length > 1;

        console.log("participant", participants);

        return (
          <div
            key={`${group}-${i}`}
            className={classNames(
              isErrorMessageVisible && "border-2 border-red-500",
              "rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
            )}
          >
            <div
              className={classNames(
                "relative ml-2 grid max-h-[22rem] min-h-[17rem] min-w-[9.375rem] grid-cols-1 content-start overflow-y-auto"
              )}
            >
              <EditTournamentHeader
                group={group}
                isMoreThanOneGroup={isMoreThanOneGroup}
              />
              {participants.map((participant) => {
                const isChanged = changedParticipantsIds.includes(
                  participant.id
                );
                return (
                  <EditParticipant
                    group={group}
                    key={participant.id}
                    isChanged={isChanged}
                    teamsByGroup={teamsMap}
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
            <div className="mt-4">
              <Button
                btnClass="mr-4 w-40"
                btnTitle="Add new team"
                onClick={() => {
                  handleStartAddTeam(group);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EditTournamentCard;
