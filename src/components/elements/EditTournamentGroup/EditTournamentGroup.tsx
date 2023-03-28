import AddNewParticipants from "components/elements/AddNewParticipants/AddNewParticipants";
import AddNewTeam from "components/elements/AddNewTeam/AddNewTeam";
import EditParticipantTournamentCard from "components/elements/EditParticipantTournamentCard/EditParticipantTournamentCard";
import getGroupThatAreToSmall from "components/elements/EditTournament/utils/getGroupThatAreToSmall";
import getUpdatedParticipants from "components/elements/EditTournament/utils/getUpdatedParticipants";
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
import EditParticipantTeamsCard from "../EditParticipantTeamsCard/EditParticipantTeamsCard";

interface EditTournamentGroupProps {
  tournamentId: string;
  handleEditGroupGame: (group: string) => void;
}

const EditTournamentGroup: FC<EditTournamentGroupProps> = ({
  tournamentId,
  handleEditGroupGame,
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
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
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
      <div className="mt-3 mb-6 flex w-full justify-between">
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
      </div>

      {tournament?.tournament.type === "KING" ? (
        <AddNewParticipants
          tournamentId={tournamentId}
          selectedGroup={selectedGroup}
          isAddNewParticipants={Boolean(selectedGroup)}
          handleCancelClick={() => {
            setSelectedGroup(null);
            refetchParticipants().catch((err) => console.error(err));
          }}
        />
      ) : (
        <AddNewTeam
          tournamentId={tournamentId}
          selectedGroup={selectedGroup}
          isAddNewTeamOpen={Boolean(selectedGroup)}
          handleCancelClick={() => {
            setSelectedGroup(null);
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
          {tournament?.tournament.type === "KING" ? (
            <EditParticipantTournamentCard
              groupToSmall={groupToSmall}
              resetNameChange={resetNameChange}
              handleEditGroupGame={handleEditGroupGame}
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
              handleStartAddTeam={(group) => {
                setSelectedGroup((state) => (state === group ? null : group));
              }}
              handleGroupChange={(team, oldGroup, newGroup) => {
                handleGroupChange(team, oldGroup, newGroup).catch((e) =>
                  console.error("error changing group", e)
                );
              }}
            />
          ) : (
            <EditParticipantTeamsCard />
          )}
        </GridLayout>
      </div>
    </>
  );
};

export default EditTournamentGroup;
