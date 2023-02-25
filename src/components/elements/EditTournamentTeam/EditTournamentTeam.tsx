import ConfirmTooltip from "components/elements/ConfirmTooltip/ConfirmTooltip";
import type { FC } from "react";
import type { TeamsByGroupType, TeamType } from "types/team.types";
import classNames from "utils/classNames";
import { getAvailableGroups } from "utils/teamsMapFunctions";

interface EditTournamentTeamProps {
  group: string;
  team: TeamType;
  isFirstGroup: boolean;
  teamToDelete: TeamType | null;
  teamsByGroup: TeamsByGroupType;
  handleCancelDeleteTeam: () => void;
  setTeamToDelete: (team: TeamType) => void;
  handleDeleteTeam: (team: TeamType) => Promise<void>;
  handleTeamsNameChange: (team: TeamType, newName: string) => void;
  handleGroupChange: (
    team: TeamType,
    oldGroup: string,
    newGroup: string
  ) => void;
}

const EditTournamentTeam: FC<EditTournamentTeamProps> = ({
  team,
  group,
  teamsByGroup,
  isFirstGroup,
  teamToDelete,
  setTeamToDelete,
  handleDeleteTeam,
  handleGroupChange,
  handleTeamsNameChange,
  handleCancelDeleteTeam,
}) => {
  return (
    <div
      key={team.id}
      className={classNames(
        !isFirstGroup && "border-t-2",
        "flex items-center justify-between py-2"
      )}
    >
      <input
        className="bg-gray-50 text-sm text-gray-800 focus:outline-none"
        value={team.name}
        onChange={(e) => {
          handleTeamsNameChange(team, e.target.value);
        }}
      />
      <div className="flex">
        <div className="relative">
          <button
            className="ml-2 rounded-md bg-red-500 py-0.5 px-2 text-sm text-white"
            onClick={() => {
              setTeamToDelete(team);
            }}
          >
            Delete
          </button>
          <ConfirmTooltip
            cancelTitle="Cancel"
            confirmTitle="Delete"
            handleConfirm={() => {
              handleDeleteTeam(team).catch((e) => console.log(e));
            }}
            handleCancel={handleCancelDeleteTeam}
            isTooltip={team.id === teamToDelete?.id}
          />
        </div>
        {getAvailableGroups(group, teamsByGroup).map((newGroup) => (
          <button
            key={newGroup}
            className="ml-2 h-6 w-6 rounded-md bg-gray-200 text-sm hover:bg-gray-800 hover:text-white"
            onClick={() => handleGroupChange(team, group, newGroup)}
          >
            {newGroup}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditTournamentTeam;
