import { type TeamType } from "~/types/tournament.types";
import { type TeamsMapType } from "~/types/utils.types";

type ChangeTeamsGroupArgs = {
  group: string;
  team: TeamType;
  teamsByGroup: TeamsMapType;
};

const changeTeamsGroup = ({
  team,
  group,
  teamsByGroup,
}: ChangeTeamsGroupArgs) => {
  const newTeamsByGroup = new Map(teamsByGroup);
  const newTeams = newTeamsByGroup.get(team.group) || [];
  const newTeamsInGroup = newTeams.filter((t) => t.id !== team.id);
  newTeamsByGroup.set(team.group, newTeamsInGroup);

  const newTeamsInNewGroup = newTeamsByGroup.get(group) || [];
  newTeamsInNewGroup.push({
    ...team,
    group,
    players: team.players.map((player) => {
      return {
        ...player,
        group,
      };
    }),
  });

  newTeamsByGroup.set(group, newTeamsInNewGroup);

  return newTeamsByGroup;
};

export default changeTeamsGroup;
