import AddNewParticipants from "components/elements/AddNewParticipants/AddNewParticipants";
import AddNewTeam from "components/elements/AddNewTeam/AddNewTeam";
import EditParticipantTeamsCard from "components/elements/EditParticipantTeamsCard/EditParticipantTeamsCard";
import EditParticipantTournamentCard from "components/elements/EditParticipantTournamentCard/EditParticipantTournamentCard";
import getGroupThatAreToSmall from "components/elements/EditTournament/utils/getGroupThatAreToSmall";
import getUpdatedParticipants from "components/elements/EditTournament/utils/getUpdatedParticipants";
import EditTournamentGameOrderModal from "components/elements/EditTournamentGameOrderModal/EditTournamentGameOrderModal";
import EditTournamentName from "components/elements/EditTournamentName/EditTournamentName";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import SmallButton from "components/elements/SmallButton/SmallButton";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useParticipants from "hooks/useParticipants";
import useTournament from "hooks/useTournament";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { RiSaveLine } from "react-icons/ri";
import type { ParticipantMapType, ParticipantType } from "types/team.types";
import { api } from "utils/api";
import { getKeys } from "utils/teamsMapFunctions";

export type EditType = "addTeam" | "editGame" | "";

type EditGroupType = {
  group: string;
  editType: EditType;
};

interface EditTournamentGroupProps {
  tournamentId: string;
}

const EditTournamentGroup: FC<EditTournamentGroupProps> = ({
  tournamentId,
}) => {
  const { windowSize } = useWindowSize();

  const [groupToSmall, setGroupToSmall] = useState<string[]>([]);
  const deleteTeam = api.participant.deleteParticipant.useMutation();
  const { tournament, refetchTournament } = useTournament(tournamentId);
  const [participantsToDelete, setParticipantsToDelete] =
    useState<ParticipantType | null>(null);

  const [participantsByGroup, setParticipantsByGroup] =
    useState<ParticipantMapType>(new Map());
  const [changedParticipantsIds, setChangedParticipantsIds] = useState<
    string[]
  >([]);
  const [selectedEditGroup, setSelectedEditGroup] = useState<EditGroupType>({
    group: "",
    editType: "",
  });
  const { participants, refetchParticipants } = useParticipants(tournamentId);
  const [isTournamentNameChanged, setIsTournamentNameChanged] = useState(false);
  const [newTournamentName, setNewTournamentName] = useState<string | null>(
    null
  );

  const { refetch: refetchGames } = api.tournaments.getTournamentGames.useQuery(
    { tournamentId }
  );

  const { mutateAsync: updateParticipantsGroup } =
    api.participant.updateParticipantsGroup.useMutation();

  const { mutateAsync: updateTournamentName } =
    api.tournaments.updateTournament.useMutation();

  const { mutateAsync: updateParticipant } =
    api.participant.updatedParticipant.useMutation();

  const addGroupToTournament = (group: string) => {
    const newStates = new Map(participantsByGroup);
    newStates.set(group, []);

    const sortedAsc = new Map([...newStates].sort());

    setParticipantsByGroup(sortedAsc);
  };

  const handleGroupChange = async (
    team: ParticipantType,
    oldGroup: string,
    newGroup: string
  ) => {
    if (!participants) return;

    await updateParticipantsGroup({
      team,
      newGroup,
      oldGroup,
      tournamentId,
    });

    await refetchGames();
    await refetchTournament();
    await refetchParticipants();
  };

  const handleParticipantNameChange = (
    participant: ParticipantType,
    newName: string
  ) => {
    const newStates = new Map(participantsByGroup);

    if (!participants) return;

    setChangedParticipantsIds(
      getUpdatedParticipants(newName, participants.participants, participant)
    );

    // find participant in group and change name
    newStates.set(participant.group, [
      ...(newStates.get(participant.group)?.map((t) => {
        if (t.id === participant.id) {
          return { ...t, name: newName };
        }
        return t;
      }) || []),
    ]);

    setParticipantsByGroup(newStates);
  };

  const resetNameChange = (participant: ParticipantType) => {
    if (!participants) return;

    setParticipantsByGroup(participants.participants);
    setChangedParticipantsIds((state) =>
      state.filter((id) => id !== participant.id)
    );
  };

  // after update teams, update tournament name
  const handleParticipantUpdate = async (participant: ParticipantType) => {
    await updateParticipant({
      id: participant.id,
      name: participant.name,
    });

    setChangedParticipantsIds((state) =>
      state.filter((id) => id !== participant.id)
    );

    await refetchGames();
    await refetchParticipants();
  };

  const handleTournamentName = async () => {
    if (newTournamentName) {
      await updateTournamentName({
        id: tournamentId,
        name: newTournamentName,
      });

      setIsTournamentNameChanged(false);

      await refetchTournament();
    }
  };

  const handleTournamentNameChange = (str: string) => {
    if (str === tournament?.tournament.name) {
      setIsTournamentNameChanged(false);
    }

    if (str !== tournament?.tournament.name) {
      setIsTournamentNameChanged(true);
    }

    setNewTournamentName(str);
  };

  const handleDeleteParticipant = async (participant: ParticipantType) => {
    await deleteTeam.mutateAsync({
      participant,
      tournamentId,
    });
    await refetchGames();
    await refetchParticipants();
  };

  useEffect(() => {
    if (!tournament) return;

    setNewTournamentName(tournament.tournament.name);
  }, [tournament]);

  useEffect(() => {
    if (!participants) return;

    setParticipantsByGroup(participants.participants);
    setGroupToSmall(getGroupThatAreToSmall(participants.participants));
  }, [participants]);

  return (
    <>
      {/* <div className="mt-3 mb-6 flex w-full justify-between">
        <div className="flex">
          <EditTournamentName
            newTournamentName={newTournamentName}
            setNewTournamentName={handleTournamentNameChange}
          />
          {isTournamentNameChanged && (
            <>
              <SmallButton
                btnTitle={<RiSaveLine className="h-6 w-6" />}
                btnClassNames="h-11 w-11 flex items-center justify-center"
                handleClick={() => {
                  handleTournamentName().catch((e) => console.error(e));
                }}
              />
              <SmallButton
                btnTitle={<GrPowerReset className="h-6 w-6" />}
                btnClassNames="h-11 w-11 flex items-center justify-center"
                handleClick={() => {
                  setIsTournamentNameChanged(false);
                  setNewTournamentName(tournament?.tournament.name || "");
                }}
              />
            </>
          )}
        </div>

        <GroupDropdown
          handleGroupClick={addGroupToTournament}
          alreadyCreatedGroups={getKeys(participantsByGroup)}
        />
      </div> */}

      {tournament?.tournament.type === "KING" ? (
        <AddNewParticipants
          tournamentId={tournamentId}
          selectedGroup={selectedEditGroup.group}
          isAddNewParticipants={selectedEditGroup.editType === "addTeam"}
          handleCancelClick={() => {
            setSelectedEditGroup({
              group: "",
              editType: "",
            });
            refetchParticipants().catch((err) => console.error(err));
          }}
        />
      ) : (
        <AddNewTeam
          tournamentId={tournamentId}
          selectedGroup={selectedEditGroup.group}
          isAddNewTeamOpen={selectedEditGroup.editType === "addTeam"}
          handleCancelClick={() => {
            setSelectedEditGroup({
              group: "",
              editType: "",
            });
            refetchParticipants().catch((err) => console.error(err));
          }}
        />
      )}

      <div
        style={
          windowSize.width && windowSize.width > 650
            ? { maxHeight: "calc(100vh - 17rem)" }
            : { maxHeight: "calc(100vh - 14rem)" }
        }
      >
        <GridLayout isGap minWith="350">
          {tournament?.tournament.type === "KING" && (
            <EditParticipantTournamentCard
              groupToSmall={groupToSmall}
              resetNameChange={resetNameChange}
              handleStartEditGroup={(group, type) => {
                setSelectedEditGroup((state) => {
                  if (state.group === group) {
                    return { group: "", editType: "editGame" };
                  }
                  return { group, editType: type };
                });
              }}
              participantsByGroup={participantsByGroup}
              participantsToDelete={participantsToDelete}
              changedParticipantsIds={changedParticipantsIds}
              handleParticipantUpdate={handleParticipantUpdate}
              setParticipantsToDelete={setParticipantsToDelete}
              handleDeleteParticipant={handleDeleteParticipant}
              handleParticipantNameChange={handleParticipantNameChange}
              handleCancelDeleteParticipants={() => {
                setParticipantsToDelete(null);
              }}
              handleGroupChange={(team, oldGroup, newGroup) => {
                handleGroupChange(team, oldGroup, newGroup).catch((e) =>
                  console.error("error changing group", e)
                );
              }}
            />
          )}
        </GridLayout>

        {tournament?.tournament.type === "TEAMS" && (
          <EditParticipantTeamsCard
            tournamentId={tournamentId}
            handleStartEditGroup={(group, type) => {
              setSelectedEditGroup((state) => {
                if (state.group === group) {
                  return { group: "", editType: "" };
                }
                return { group, editType: type };
              });
            }}
          />
        )}

        <EditTournamentGameOrderModal
          tournamentId={tournamentId}
          gameEditGroup={selectedEditGroup.group}
          isGameOrderModalOpen={selectedEditGroup.editType === "editGame"}
          handleCancelClick={() => {
            setSelectedEditGroup({ group: "", editType: "" });
          }}
        />
      </div>
    </>
  );
};

export default EditTournamentGroup;
