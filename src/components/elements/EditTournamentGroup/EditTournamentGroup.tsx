import Button from "components/elements/Button/Button";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import EditTournamentTeam from "components/elements/EditTournamentTeam/EditTournamentTeam";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useTeams from "hooks/useTeams";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TeamsByGroupType, TeamType } from "types/team.types";
import { api } from "utils/api";
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
  const { teams, refetchTeams } = useTeams();
  const { mutateAsync } = api.teams.updateTeam.useMutation();
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsByGroupType>(new Map());

  const addGroupToTeams = (group: string) => {
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

    await refetchTeams();
  };

  // TODO: Add option to add and remove teams

  useEffect(() => {
    setTeamsByGroup(sortTeamsByGroup(teams?.teams || []));
  }, [teams]);

  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Edit tournament groups"
      handleCancelClick={handleCloseModal}
    >
      <div className="mt-3 mb-6 flex w-full justify-end">
        <Button
          btnClass="mr-4"
          btnTitle="Add new team"
          onClick={() => {
            console.log("add new team");
          }}
        />
        <GroupDropdown
          handleGroupClick={addGroupToTeams}
          alreadyCreatedGroups={getKeys(teamsByGroup)}
        />
      </div>

      <GridLayout isGap minWith="320">
        {[...teamsByGroup].map(([group, value], i) => {
          const isMoreThanOneGroup = getKeys(teamsByGroup).length > 1;

          return (
            <EditTournamentHeader
              group={group}
              key={`${group}-${i}`}
              isMoreThanOneGroup={isMoreThanOneGroup}
            >
              {value.map((team, i) => {
                const isFirstGroup = i === 0;
                return (
                  <EditTournamentTeam
                    team={team}
                    key={team.id}
                    group={group}
                    teamsByGroup={teamsByGroup}
                    isFirstGroup={isFirstGroup}
                    handleGroupChange={handleGroupChange}
                    handleTeamsNameChange={handleTeamsNameChange}
                  />
                );
              })}
            </EditTournamentHeader>
          );
        })}
      </GridLayout>
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
