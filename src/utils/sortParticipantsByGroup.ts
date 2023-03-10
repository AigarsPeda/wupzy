import type { ParticipantType } from "types/team.types";

const sortParticipantsByGroup = (teams: ParticipantType[]) => {
  const teamsByGroup = new Map<string, ParticipantType[]>();

  teams.forEach((team) => {
    const group = team.group;
    const teamsInGroup = teamsByGroup.get(group);

    if (teamsInGroup) {
      teamsInGroup.push(team);
      return;
    }

    teamsByGroup.set(group, [team]);
  });

  // sort map keys alphabetically
  const sortedAsc = new Map([...teamsByGroup].sort());

  return sortedAsc;
};

export default sortParticipantsByGroup;
