import AddNewTeam from "components/elements/AddNewTeam/AddNewTeam";
import Button from "components/elements/Button/Button";
import isGroupToSmall from "components/elements/EditTournamentGroup/utils/isGroupToSmall";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import EditTournamentName from "components/elements/EditTournamentName/EditTournamentName";
import EditTournamentTeam from "components/elements/EditTournamentTeam/EditTournamentTeam";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useTeams from "hooks/useTeams";
import useTournament from "hooks/useTournament";
import useWindowSize from "hooks/useWindowSize";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TeamsMapType, TeamType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import getTodayDate from "utils/getTodayDate";
import sortTeamsByGroup from "utils/sortTeamsByGroup";
import { getKeys } from "utils/teamsMapFunctions";

interface EditTournamentGroupProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const EditTournamentGroup: FC<EditTournamentGroupProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const { query } = useRouter();
  const { windowSize } = useWindowSize();
  const [tournamentId, setTournamentId] = useState<string>("");
  const [groupToSmall, setGroupToSmall] = useState<string[]>([]);
  const deleteTeam = api.participant.deleteParticipant.useMutation();
  const { participants, refetchParticipants } = useTeams(tournamentId);
  const { tournament, refetchTournament } = useTournament(tournamentId);
  const [teamToDelete, setTeamToDelete] = useState<TeamType | null>(null);
  const { mutateAsync } = api.participant.updateParticipants.useMutation();
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsMapType>(new Map());
  const [addNewTeamGroup, setAddNewTeamGroup] = useState<string | null>(null);
  const { refetch: refetchGames } = api.tournaments.getTournamentGames.useQuery(
    {
      id: tournamentId,
    }
  );

  const { mutateAsync: updateTournamentName } =
    api.tournaments.updateTournament.useMutation();
  const [newTournamentName, setNewTournamentName] = useState<string | null>(
    null
  );

  const addGroupToTournament = (group: string) => {
    const newStates = new Map(teamsByGroup);
    newStates.set(group, []);

    const sortedAsc = new Map([...newStates].sort());

    setTeamsByGroup(sortedAsc);
  };

  const handleGroupChange = (
    team: TeamType,
    oldGroup: string,
    newGroup: string
  ) => {
    const newStates = new Map(teamsByGroup);

    // remove team from old group
    newStates.set(oldGroup, [
      ...(newStates.get(oldGroup)?.filter((t) => t.id !== team.id) || []),
    ]);

    // add team to new group
    newStates.set(newGroup, [
      ...(newStates.get(newGroup) || []),
      // update team group property to new group
      { ...team, group: newGroup },
    ]);

    setGroupToSmall(isGroupToSmall(newStates));
    setTeamsByGroup(newStates);
  };

  const handleTeamsNameChange = (team: TeamType, newName: string) => {
    const newStates = new Map(teamsByGroup);

    newStates.set(team.group, [
      ...(newStates.get(team.group)?.map((t) => {
        if (t.id === team.id) {
          return { ...t, name: newName };
        }
        return t;
      }) || []),
    ]);

    setTeamsByGroup(newStates);
  };

  const handleUpdateTeam = async (teamsMap: TeamsMapType) => {
    const teamsArray = [...teamsMap.values()].flat().map((team) => ({
      id: team.id,
      name: team.name,
      score: team.score,
      group: team.group,
    }));

    await updateTournamentName({
      id: tournamentId,
      name: newTournamentName || tournament?.tournament.name || getTodayDate(),
    });

    await mutateAsync({
      tournamentId: tournamentId,
      teams: teamsArray,
    });

    await refetchGames();
    await refetchTournament();
    await refetchParticipants();
  };

  const handleDeleteTeam = async (team: TeamType) => {
    await deleteTeam.mutateAsync({
      id: team.id,
    });
    await refetchParticipants();
    await refetchGames();
  };

  useEffect(() => {
    if (!query.tournamentsId || typeof query.tournamentsId !== "string") return;

    setTournamentId(query.tournamentsId);
  }, [query.tournamentsId]);

  useEffect(() => {
    if (!tournament) return;
    setNewTournamentName(tournament.tournament.name);
  }, [tournament]);

  useEffect(() => {
    const sortedTeams = sortTeamsByGroup(participants?.participants || []);

    setGroupToSmall(isGroupToSmall(sortedTeams));
    setTeamsByGroup(sortedTeams);
  }, [participants]);

  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Edit tournament groups"
      handleCancelClick={handleCloseModal}
    >
      <div className="mt-3 mb-6 flex w-full justify-between">
        <EditTournamentName
          newTournamentName={newTournamentName}
          setNewTournamentName={setNewTournamentName}
        />
        <GroupDropdown
          handleGroupClick={addGroupToTournament}
          alreadyCreatedGroups={getKeys(teamsByGroup)}
        />
      </div>

      <AddNewTeam
        addNewTeamGroup={addNewTeamGroup}
        tournamentId={tournamentId}
        isAddNewTeamOpen={Boolean(addNewTeamGroup)}
        handleCancelClick={() => {
          setAddNewTeamGroup(null);
          refetchParticipants().catch((err) => console.error(err));
        }}
      />

      <div
        className="overflow-y-auto"
        style={
          windowSize.width && windowSize.width > 650
            ? { maxHeight: "calc(100vh - 17rem)" }
            : { maxHeight: "calc(100vh - 14rem)" }
        }
      >
        <GridLayout isGap minWith="350">
          {[...teamsByGroup].map(([group, value], i) => {
            const isErrorMessageVisible = groupToSmall.includes(group);
            const isMoreThanOneGroup = getKeys(teamsByGroup).length > 1;

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
                  {value.map((team, i) => {
                    const isFirstGroup = i === 0;
                    return (
                      <EditTournamentTeam
                        team={team}
                        key={team.id}
                        group={group}
                        teamToDelete={teamToDelete}
                        teamsByGroup={teamsByGroup}
                        isFirstGroup={isFirstGroup}
                        setTeamToDelete={setTeamToDelete}
                        handleDeleteTeam={handleDeleteTeam}
                        handleGroupChange={handleGroupChange}
                        handleTeamsNameChange={handleTeamsNameChange}
                        handleCancelDeleteTeam={() => setTeamToDelete(null)}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  {isErrorMessageVisible && (
                    <p className="text-xs text-red-500">
                      Group don&apos;t have enough teams. You need at least 4
                      teams.
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <Button
                    btnClass="mr-4 w-40"
                    btnTitle="Add new team"
                    onClick={() => {
                      setAddNewTeamGroup((state) =>
                        state === group ? null : group
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </GridLayout>
      </div>
      <div className="flex w-full justify-end">
        <Button
          btnColor="outline"
          isDisabled={groupToSmall.length > 0}
          btnTitle={<span className="px-3 text-sm">Save changes</span>}
          onClick={() => {
            handleUpdateTeam(teamsByGroup).catch((e) =>
              console.error("Error updating team", e)
            );
            handleCloseModal();
          }}
        />
      </div>
    </ModalWrap>
  );
};

export default EditTournamentGroup;
