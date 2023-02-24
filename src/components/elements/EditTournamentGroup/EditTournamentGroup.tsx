import AddNewTeam from "components/elements/AddNewTeam/AddNewTeam";
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
  const { teams, refetchTeams, tournamentId } = useTeams();
  const { mutateAsync } = api.teams.updateTeam.useMutation();
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

    await refetchTeams();
  };

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
          refetchTeams().catch((err) => console.error(err));
        }}
      />

      <div className="max-h-[40rem] overflow-y-auto">
        <GridLayout isGap minWith="320">
          {[...teamsByGroup].map(([group, value], i) => {
            const isMoreThanOneGroup = getKeys(teamsByGroup).length > 1;

            return (
              <div
                key={`${group}-${i}`}
                className="rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
              >
                <div
                  className={classNames(
                    !isMoreThanOneGroup && "max-w-[50%]",
                    "relative ml-2 grid max-h-[22rem] min-h-[17rem] min-w-[20rem] grid-cols-1 content-start overflow-y-auto "
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
                        teamsByGroup={teamsByGroup}
                        isFirstGroup={isFirstGroup}
                        handleGroupChange={handleGroupChange}
                        handleTeamsNameChange={handleTeamsNameChange}
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
