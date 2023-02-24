import Button from "components/elements/Button/Button";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import EditTournamentTeam from "components/elements/EditTournamentTeam/EditTournamentTeam";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TeamsByGroupType, TeamType } from "types/team.types";
import sortTeamsByGroup from "utils/sortTeamsByGroup";
import { getKeys } from "utils/teamsMapFunctions";

interface EditTournamentGroupProps {
  teams: TeamType[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateTeam: (team: TeamsByGroupType) => Promise<void>;
}

const EditTournamentGroup: FC<EditTournamentGroupProps> = ({
  teams,
  isModalOpen,
  handleCloseModal,
  handleUpdateTeam,
}) => {
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

  useEffect(() => {
    setTeamsByGroup(sortTeamsByGroup(teams));
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
