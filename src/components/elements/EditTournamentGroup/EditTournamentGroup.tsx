import type { Team } from "@prisma/client";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import ModalWrap from "components/elements/Modal/Modal";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useEffect, useState } from "react";
import classNames from "utils/classNames";
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
        <GroupDropdown
          handleGroupClick={addGroupToTeams}
          alreadyCreatedGroups={getKeys(teamsByGroup)}
        />
      </div>

      <GridLayout minWith="320">
        {[...teamsByGroup].map(([group, value], i) => {
          const isLastGroup = getKeys(teamsByGroup).length - 1 === i;
          const isMoreThanOneGroup = getKeys(teamsByGroup).length > 1;

          return (
            <div
              key={group}
              className={classNames(
                isMoreThanOneGroup && !isLastGroup
                  ? "border-collapse border-r-2 border-gray-800"
                  : "",
                "min-h-[20rem] min-w-[20rem] px-8 py-3"
              )}
            >
              <div className="flex justify-between">
                <p className="mb-3 text-sm text-gray-400">Group - {group}</p>
                {isMoreThanOneGroup && (
                  <p className={classNames("mb-3 text-sm text-gray-400")}>
                    Move to
                  </p>
                )}
              </div>
              {value.map((team) => {
                return (
                  <div key={team.id} className="my-2 flex justify-between">
                    <p>{team.name}</p>
                    <div>
                      {getAvailableGroups(group, teamsByGroup).map(
                        (newGroup) => (
                          <button
                            key={newGroup}
                            className="ml-2 h-6 w-6 rounded-md bg-gray-200 text-sm hover:bg-gray-800 hover:text-white"
                            onClick={() =>
                              handleGroupChange(team, group, newGroup)
                            }
                          >
                            {newGroup}
                          </button>
                        )
                      )}
                    </div>
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
