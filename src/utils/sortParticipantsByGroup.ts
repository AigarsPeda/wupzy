import type { ParticipantType } from "types/team.types";

const sortParticipantsByGroup = (teams: ParticipantType[]) => {
  const teamsByGroup = new Map<string, ParticipantType[]>();

  for (const team of teams) {
    const group = team.group;

    if (!teamsByGroup.has(group)) {
      teamsByGroup.set(group, []);
    }

    teamsByGroup.get(group)?.push(team);
  }

  // sort map keys alphabetically
  const sortedAsc = new Map([...teamsByGroup].sort());

  // sort teams in each group alphabetically
  sortedAsc.forEach((teamsInGroup) => {
    teamsInGroup.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  });

  return sortedAsc;
};

export default sortParticipantsByGroup;
