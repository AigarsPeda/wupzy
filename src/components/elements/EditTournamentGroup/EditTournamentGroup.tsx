import type { Team } from "@prisma/client";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
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

  useEffect(() => {
    setTeamsByGroup(sortTeamsByGroup(teams));
  }, [teams]);

  return (
    <ModalWrap
      modalWidth="xl"
      isModalVisible={isModalOpen}
      modalTitle="Crete new tournament"
      handleCancelClick={handleCloseModal}
    >
      <div className="flex w-full justify-end">
        <GroupDropdown
          handleGroupClick={addGroupToTeams}
          alreadyCreatedGroups={Object.keys(teamsByGroup)}
        />
      </div>
      {[...teamsByGroup].map(([key, value]) => {
        return (
          <div key={key}>
            <p className="mb-3 text-sm text-gray-400">Group - {key}</p>
            {value.map((team) => (
              <div key={team.id}>{team.name}</div>
            ))}
          </div>
        );
      })}
    </ModalWrap>
  );
};

export default EditTournamentGroup;
