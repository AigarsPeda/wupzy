import { useAutoAnimate } from "@formkit/auto-animate/react";
import EditGroupDropdown from "components/elements/EditGroupDropdown/EditGroupDropdown";
import type { EditType } from "components/elements/EditTournamentGroup/EditTournamentGroup";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import SmallButton from "components/elements/SmallButton/SmallButton";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import type { ParticipantMapType, ParticipantType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import { getKeys } from "utils/teamsMapFunctions";

interface EditParticipantTournamentCardProps {
  tournamentId: string;
  setSelectedEdit: (
    group: string,
    editKind: EditType,
    participant?: ParticipantType
  ) => void;
}

const EditParticipantTournamentCard: FC<EditParticipantTournamentCardProps> = ({
  tournamentId,
  setSelectedEdit,
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
      group,
      tournamentId,
      participantId,
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
                    setSelectedEdit(group, "editGameOrder");
                  }}
                  handleStartAddTeam={() => {
                    setSelectedEdit(group, "addParticipant");
                  }}
                />
              </div>

              <ul ref={parent}>
                <li className="my-3 grid grid-cols-3 gap-4">
                  <div className="flex justify-start">
                    <p className="text-xs">Name</p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-xs">Move to</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-right text-xs">Option</p>
                  </div>
                </li>
                {participants.map((participant) => (
                  <li
                    key={participant.id}
                    className="grid grid-cols-3 gap-4 py-2"
                  >
                    <div className="flex justify-start">
                      <p> {participant.name}</p>
                    </div>
                    <div className="flex justify-center">
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
                    </div>

                    <div className="flex justify-end">
                      <SmallButton
                        btnTitle={<FiEdit2 />}
                        btnClassNames="h-6 w-6 ml-2"
                        handleClick={() => {
                          setSelectedEdit(
                            participant.id,
                            "editParticipant",
                            participant
                          );
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </GridLayout>
      </>
    </>
  );
};

export default EditParticipantTournamentCard;
