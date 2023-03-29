import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditGroupDropdown from "components/elements/EditGroupDropdown/EditGroupDropdown";
import type { EditType } from "components/elements/EditTournamentGroup/EditTournamentGroup";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import SmallButton from "components/elements/SmallButton/SmallButton";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { ParticipantMapType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import { getKeys } from "utils/teamsMapFunctions";

interface EditParticipantTournamentCardProps {
  tournamentId: string;
  handleStartEditGroup: (group: string, editKind: EditType) => void;
}

const EditParticipantTournamentCard: FC<EditParticipantTournamentCardProps> = ({
  tournamentId,
  handleStartEditGroup,
}) => {
  const [parent] = useAutoAnimate();
  const [isError, setIsError] = useState(false);
  const { participants, refetchParticipants } = useParticipants(tournamentId);
  const [participantsByGroup, setParticipantsByGroup] =
    useState<ParticipantMapType>(new Map());
  const { mutateAsync: updateParticipantsGroup } =
    api.participant.updateParticipantsGroup.useMutation();

  const handleTeamsGroupChange = async (
    participantId: string,
    group: string
  ) => {
    if (!participants) return;

    await updateParticipantsGroup({
      participantId,
      group,
      tournamentId,
    });

    await refetchParticipants();
  };

  const addGroupToTournament = (group: string) => {
    setParticipantsByGroup((prev) => {
      const newMap = new Map(prev);
      newMap.set(group, []);
      return newMap;
    });
  };

  useEffect(() => {
    if (!participants) return;
    setParticipantsByGroup(participants.participants);
  }, [participants]);

  return (
    <>
      <>
        <div className="mb-5 flex justify-end">
          <GroupDropdown
            handleGroupClick={addGroupToTournament}
            alreadyCreatedGroups={getKeys(participantsByGroup)}
          />
        </div>
        <GridLayout isGap minWith="350">
          {[...participantsByGroup].map(([group, participants]) => (
            <div
              key={`${group}`}
              className={classNames(
                isError && "border-2 border-red-500",
                "rounded-md border border-gray-50 bg-gray-50 px-3 py-3 shadow-md md:px-8"
              )}
            >
              <div className="flex justify-between">
                <h2 className="text-3xl">{group}</h2>
                <EditGroupDropdown
                  handleEditGroupGame={() => {
                    handleStartEditGroup(group, "editGame");
                  }}
                  handleStartAddTeam={() => {
                    handleStartEditGroup(group, "addTeam");
                  }}
                />
              </div>

              <ul ref={parent}>
                <div className="my-3 grid grid-cols-3 gap-4">
                  <p className="text-xs">Name</p>
                  <p className="text-xs">Change to</p>
                </div>
                {participants.map((participant) => (
                  <li
                    key={participant.id}
                    className="grid grid-cols-3 gap-4 border-b-2 py-1"
                  >
                    <p> {participant.name}</p>
                    {getKeys(participantsByGroup).map((g, i) => {
                      if (g === group) return null;

                      return (
                        <SmallButton
                          btnTitle={g}
                          key={`${g}-${i}`}
                          btnClassNames="h-6 w-6 ml-2"
                          handleClick={() => {
                            handleTeamsGroupChange(participant.id, g).catch(
                              () => setIsError(true)
                            );
                          }}
                        />
                      );
                    })}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </GridLayout>
      </>
      {/* {[...participantsByGroup].map(([group, participants]) => {
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
                  handleStartEditGroup(group, "editGame");
                }}
                handleStartAddTeam={() => {
                  handleStartEditGroup(group, "addTeam");
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
      })} */}
    </>
  );
};

export default EditParticipantTournamentCard;
