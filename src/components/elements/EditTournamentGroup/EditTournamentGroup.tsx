import type { Team } from "@prisma/client";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useEffect, useState } from "react";
import sortTeamsByGroup from "utils/sortTeamsByGroup";

type TeamsByGroupType = Map<string, Team[]>;

interface EditTournamentGroupProps {
  teams: Team[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const EditTournamentGroup: FC<EditTournamentGroupProps> = ({
  teams,
  isModalOpen,
  handleCloseModal,
}) => {
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsByGroupType>(new Map());

  const addGroupToTeams = (group: string) => {
    const newStates = new Map(teamsByGroup);
    newStates.set(group, []);

    setTeamsByGroup(newStates);
  };

  const getKeys = (teamsMap: TeamsByGroupType) => {
    return [...teamsMap.keys()];
  };

  const getAvailableGroups = (group: string, teams: TeamsByGroupType) => {
    return getKeys(teams).filter((f) => f !== group);
  };

  const handleGroupChange = (
    team: Team,
    oldGroup: string,
    newGroup: string
  ) => {
    const newStates = new Map(teamsByGroup);

    console.log("team --->", team);
    console.log("newGroup --->", newGroup);
    console.log("oldGroup --->", oldGroup);

    const oldGroupTeams = newStates.get(oldGroup);
    const newGroupTeams = newStates.get(newGroup);

    if (oldGroupTeams && newGroupTeams) {
      const newOldGroupTeams = oldGroupTeams.filter((f) => f.id !== team.id);

      team.group = newGroup;

      const newNewGroupTeams = [...newGroupTeams, team];

      newStates.set(oldGroup, newOldGroupTeams);
      newStates.set(newGroup, newNewGroupTeams);
    }

    setTeamsByGroup(newStates);
  };

  useEffect(() => {
    console.log("teams --->", teams);
    setTeamsByGroup(sortTeamsByGroup(teams));
  }, [teams]);

  return (
    <ModalWrap
      modalWidth="7xl"
      isModalVisible={isModalOpen}
      modalTitle="Crete new tournament"
      handleCancelClick={handleCloseModal}
    >
      <div className="flex w-full justify-end">
        <GroupDropdown
          handleGroupClick={addGroupToTeams}
          alreadyCreatedGroups={getKeys(teamsByGroup)}
        />
      </div>
      <GridLayout>
        {[...teamsByGroup].map(([group, value]) => {
          return (
            <div key={group}>
              <p className="mb-3 text-sm text-gray-400">Group - {group}</p>
              {value.map((team) => {
                return (
                  <div key={team.id} className="flex">
                    <p>{team.name}</p>
                    {getAvailableGroups(group, teamsByGroup).map((newGroup) => (
                      <button
                        key={newGroup}
                        onClick={() => handleGroupChange(team, group, newGroup)}
                      >
                        {newGroup}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </GridLayout>
    </ModalWrap>
  );
};

export default EditTournamentGroup;
