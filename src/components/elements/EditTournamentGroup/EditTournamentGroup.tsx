import AddNewTeam from "components/elements/AddNewTeam/AddNewTeam";
import Button from "components/elements/Button/Button";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import EditTournamentTeam from "components/elements/EditTournamentTeam/EditTournamentTeam";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useTeams from "hooks/useTeams";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TeamsByGroupType, TeamType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
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
  const { windowSize } = useWindowSize();
  const deleteTeam = api.participant.deleteParticipant.useMutation();
  const { participant, refetchParticipant, tournamentId } = useTeams();
  const { mutateAsync } = api.participant.updateParticipant.useMutation();
  const [teamToDelete, setTeamToDelete] = useState<TeamType | null>(null);
  const [addNewTeamGroup, setAddNewTeamGroup] = useState<string | null>(null);
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsByGroupType>(new Map());

  const addGroupToTournament = (group: string) => {
    const newStates = new Map(teamsByGroup);
    newStates.set(group, []);

    setTeamsByGroup(newStates);
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

  const handleUpdateTeam = async (teamsMap: TeamsByGroupType) => {
    const teamsArray = [...teamsMap.values()].flat().map((team) => ({
      id: team.id,
      name: team.name,
      score: team.score,
      group: team.group,
    }));

    await mutateAsync({
      teams: teamsArray,
    });

    await refetchParticipant();
  };

  const handleDeleteTeam = async (team: TeamType) => {
    await deleteTeam.mutateAsync({
      id: team.id,
    });
    await refetchParticipant();
  };

  useEffect(() => {
    setTeamsByGroup(sortTeamsByGroup(participant?.participants || []));
  }, [participant]);

  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Edit tournament groups"
      handleCancelClick={handleCloseModal}
    >
      <div className="mt-3 mb-6 flex w-full justify-end">
        <GroupDropdown
          handleGroupClick={addGroupToTournament}
          alreadyCreatedGroups={getKeys(teamsByGroup)}
        />
      </div>

      <AddNewTeam
        tournamentId={tournamentId}
        addNewTeamGroup={addNewTeamGroup}
        isAddNewTeamOpen={Boolean(addNewTeamGroup)}
        handleCancelClick={() => {
          setAddNewTeamGroup(null);
          refetchParticipant().catch((err) => console.error(err));
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
            const isMoreThanOneGroup = getKeys(teamsByGroup).length > 1;

            return (
              <div
                key={`${group}-${i}`}
                className="rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
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
