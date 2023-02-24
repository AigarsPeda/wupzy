import type { FC } from "react";
import type { TeamsByGroupType, TeamType } from "types/team.types";
import classNames from "utils/classNames";
import { getAvailableGroups } from "utils/teamsMapFunctions";

interface EditTournamentTeamProps {
  group: string;
  team: TeamType;
  isFirstGroup: boolean;
  teamsByGroup: TeamsByGroupType;
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
  handleGroupChange,
  handleTeamsNameChange,
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
      <div>
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
