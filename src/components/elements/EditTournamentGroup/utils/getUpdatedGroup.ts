import type { ChangeTeamsType, ParticipantType } from "types/team.types";

const getUpdatedGroup = (
  updatedGroups: ChangeTeamsType[],
  oldGroup: string,
  newGroup: string,
  team: ParticipantType
) => {
  let teams = [...updatedGroups];

  const teamToUpdate = teams.find((g) => g.team.id === team.id);

  if (!teamToUpdate) {
    teams.push({ oldGroup, newGroup, team });
  }

  if (teamToUpdate?.team.group === newGroup) {
    teams = teams.filter((g) => g.team.id !== team.id);
  }

  if (teamToUpdate?.team.group !== newGroup) {
    teams = teams.map((g) => {
      if (g.team.id === team.id) {
        return { ...g, newGroup };
      }
      return g;
    });
  }

  return teams;
};

export default getUpdatedGroup;
