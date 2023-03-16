import type { ParticipantType } from "types/team.types";

const createParticipantMap = (teams: ParticipantType[]) => {
  const teamsByGroup = new Map<string, ParticipantType[]>();

  for (const team of teams) {
    const group = team.group;
    const g = teamsByGroup.get(group);

    if (!g) {
      teamsByGroup.set(group, [team]);
    }

    if (g) {
      g.push(team);
    }

    g?.sort((a, b) => {
      return a.name.localeCompare(b.name);
      // return a.name - b.name;
    });
  }

  // sort map keys alphabetically
  // const sortedAsc = new Map([...teamsByGroup].sort());

  // return sortedAsc;
  // const sortedEntries = Array.from(teamsByGroup.entries()).sort();

  // teamsByGroup.clear();

  // for (const [key, value] of sortedEntries) {
  //   teamsByGroup.set(key, value);
  // }

  return teamsByGroup;
};

export default createParticipantMap;
