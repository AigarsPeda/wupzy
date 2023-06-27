import { type TeamType } from "~/types/tournament.types";

const groupTeamsByGroup = (teams: TeamType[]) => {
  const teamsByGroup = new Map<string, TeamType[]>();

  for (const team of teams) {
    const teamsInGroup = teamsByGroup.get(team.group);

    if (teamsInGroup) {
      teamsInGroup.push(team);
      continue;
    }

    console.log("team.group", team.group);

    if (team.group) {
      teamsByGroup.set(team.group, [team]);
    }

    // const group = team.group;

    // console.log("group", group);

    // if (!teamsByGroup.has(group)) {
    //   teamsByGroup.set(group, []);
    // }

    // teamsByGroup.get(group)?.push(team);
  }
  return teamsByGroup;
};

export default groupTeamsByGroup;

// const groupTeamsByGroup = (teams: TeamType[] | undefined) => {
//   const teamsMap = new Map<string, TeamType[]>();

//   if (!teams) return { teamsMap };

//   teams.forEach((team) => {
//     const teamsInGroup = teamsMap.get(team.group);

//     if (teamsInGroup) {
//       teamsInGroup.push(team);
//       return;
//     }

//     teamsMap.set(team.group, [team]);
//   });

//   const teamsKey = [...teamsMap.keys()];

//   return { teamsMap, teamsKey };
// };

// export default groupTeamsByGroup;
