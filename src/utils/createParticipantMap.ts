import type { ParticipantType } from "types/team.types";

const createParticipantMap = (teams: ParticipantType[]) => {
  const teamsByGroup = new Map<string, ParticipantType[]>();

  for (const team of teams) {
    const group = team.group;
    const g = teamsByGroup.get(group);

    if (!g) {
      teamsByGroup.set(group, [team]);
    }

    // teamsByGroup.get(group)?.push(team);

    if (g) {
      g.push(team);
    }
  }

  // sort map keys alphabetically
  // const sortedAsc = new Map([...teamsByGroup].sort());

  // // sort teams in each group alphabetically
  // sortedAsc.forEach((teamsInGroup) => {
  //   teamsInGroup.sort((a, b) => {
  //     return a.name.localeCompare(b.name);
  //   });
  // });

  return teamsByGroup;
};

export default createParticipantMap;
