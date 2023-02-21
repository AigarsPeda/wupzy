import type { Team } from "@prisma/client";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import type { FC } from "react";
import { useEffect, useState } from "react";
import sortTeamsByGroup from "utils/sortTeamsByGroup";

type TeamsByGroupType = Record<string, Team[]>;

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
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsByGroupType>({});

  const addGroupToTeams = (group: string) => {
    setTeamsByGroup((state) => ({ ...state, [group]: [] }));
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
      {Object.keys(teamsByGroup).map((group) => (
        <div key={group}>
          {/* <div>{group}</div> */}
          <p className="mb-3 text-sm text-gray-400">Group - {group}</p>
          {teamsByGroup[group]?.map((team) => (
            <div key={team.id}>{team.name}</div>
          ))}
        </div>
      ))}
    </ModalWrap>
  );
};

export default EditTournamentGroup;
