import EditModalContainer from "components/containers/EditModalContainer/EditModalContainer";
import EditParticipantTeamsCard from "components/elements/EditParticipantTeamsCard/EditParticipantTeamsCard";
import EditParticipantTournamentCard from "components/elements/EditParticipantTournamentCard/EditParticipantTournamentCard";
import useTournament from "hooks/useTournament";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useState } from "react";

export type EditType =
  | "addTeam"
  | "editGame"
  | "addParticipant"
  | "editParticipant"
  | "";

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
  const { tournament } = useTournament(tournamentId);
  // const { refetchParticipants } = useParticipants(tournamentId);
  const [selectedEditGroup, setSelectedEditGroup] = useState<EditGroupType>({
    group: "",
    editType: "",
  });

  // const [groupToSmall, setGroupToSmall] = useState<string[]>([]);
  // const deleteTeam = api.participant.deleteParticipant.useMutation();

  // const [participantsToDelete, setParticipantsToDelete] =
  //   useState<ParticipantType | null>(null);

  // const [participantsByGroup, setParticipantsByGroup] =
  //   useState<ParticipantMapType>(new Map());
  // const [changedParticipantsIds, setChangedParticipantsIds] = useState<
  //   string[]
  // >([]);

  // const [isTournamentNameChanged, setIsTournamentNameChanged] = useState(false);
  // const [newTournamentName, setNewTournamentName] = useState<string | null>(
  //   null
  // );

  // const { refetch: refetchGames } = api.tournaments.getTournamentGames.useQuery(
  //   { tournamentId }
  // );

  // const { mutateAsync: updateParticipantsGroup } =
  //   api.participant.updateParticipantsGroup.useMutation();

  // const { mutateAsync: updateTournamentName } =
  //   api.tournaments.updateTournament.useMutation();

  // const { mutateAsync: updateParticipant } =
  //   api.participant.updatedParticipant.useMutation();

  // const addGroupToTournament = (group: string) => {
  //   const newStates = new Map(participantsByGroup);
  //   newStates.set(group, []);

  //   const sortedAsc = new Map([...newStates].sort());

  //   setParticipantsByGroup(sortedAsc);
  // };

  // const handleGroupChange = async (
  //   participantId: string,
  //   group: string
  //   // oldGroup: string,
  // ) => {
  //   if (!participants) return;

  //   await updateParticipantsGroup({
  //     participantId,
  //     group,
  //     tournamentId,
  //   });

  //   await refetchGames();
  //   await refetchTournament();
  //   await refetchParticipants();
  // };

  // const handleParticipantNameChange = (
  //   participant: ParticipantType,
  //   newName: string
  // ) => {
  //   const newStates = new Map(participantsByGroup);

  //   if (!participants) return;

  //   setChangedParticipantsIds(
  //     getUpdatedParticipants(newName, participants.participants, participant)
  //   );

  //   // find participant in group and change name
  //   newStates.set(participant.group, [
  //     ...(newStates.get(participant.group)?.map((t) => {
  //       if (t.id === participant.id) {
  //         return { ...t, name: newName };
  //       }
  //       return t;
  //     }) || []),
  //   ]);

  //   setParticipantsByGroup(newStates);
  // };

  // const resetNameChange = (participant: ParticipantType) => {
  //   if (!participants) return;

  //   setParticipantsByGroup(participants.participants);
  //   setChangedParticipantsIds((state) =>
  //     state.filter((id) => id !== participant.id)
  //   );
  // };

  // // after update teams, update tournament name
  // const handleParticipantUpdate = async (participant: ParticipantType) => {
  //   await updateParticipant({
  //     id: participant.id,
  //     name: participant.name,
  //   });

  //   setChangedParticipantsIds((state) =>
  //     state.filter((id) => id !== participant.id)
  //   );

  //   await refetchGames();
  //   await refetchParticipants();
  // };

  // const handleTournamentName = async () => {
  //   if (newTournamentName) {
  //     await updateTournamentName({
  //       id: tournamentId,
  //       name: newTournamentName,
  //     });

  //     setIsTournamentNameChanged(false);

  //     await refetchTournament();
  //   }
  // };

  // const handleTournamentNameChange = (str: string) => {
  //   if (str === tournament?.tournament.name) {
  //     setIsTournamentNameChanged(false);
  //   }

  //   if (str !== tournament?.tournament.name) {
  //     setIsTournamentNameChanged(true);
  //   }

  //   setNewTournamentName(str);
  // };

  // const handleDeleteParticipant = async (participant: ParticipantType) => {
  //   await deleteTeam.mutateAsync({
  //     participant,
  //     tournamentId,
  //   });
  //   await refetchGames();
  //   await refetchParticipants();
  // };

  // useEffect(() => {
  //   if (!tournament) return;

  //   setNewTournamentName(tournament.tournament.name);
  // }, [tournament]);

  // useEffect(() => {
  //   if (!participants) return;

  //   setParticipantsByGroup(participants.participants);
  //   setGroupToSmall(getGroupThatAreToSmall(participants.participants));
  // }, [participants]);

  return (
    <>
      <div
        style={
          windowSize.width && windowSize.width > 650
            ? { maxHeight: "calc(100vh - 17rem)" }
            : { maxHeight: "calc(100vh - 14rem)" }
        }
      >
        {tournament?.tournament.type === "KING" && (
          <EditParticipantTournamentCard
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

        <EditModalContainer
          tournamentId={tournamentId}
          group={selectedEditGroup.group}
          editType={selectedEditGroup.editType}
          handleCancelClick={() => {
            setSelectedEditGroup({ group: "", editType: "" });
          }}
        />
      </div>
    </>
  );
};

export default EditTournamentGroup;
