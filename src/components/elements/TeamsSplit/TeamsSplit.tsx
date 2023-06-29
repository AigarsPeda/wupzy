import { useEffect, useState } from "react";
import useTeams from "~/hooks/useTeams";
import { type TeamType } from "~/types/tournament.types";
import genUniqueId from "~/utils/genUniqueId";
import groupTeamsByGroup from "~/utils/groupTeamsByGroup";

type TeamsMapType = Map<string, TeamType[]>;

const TeamsSplit = () => {
  const { teams, isLoading } = useTeams();
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsMapType>(
    new Map<string, TeamType[]>()
  );

  useEffect(() => {
    if (!teams || isLoading) return;

    const { groups, teamsByGroup } = groupTeamsByGroup(teams);

    setTeamsByGroup(teamsByGroup);

    console.log("groups", groups);
  }, [teams, isLoading]);

  return (
    <div>
      {Array.from(teamsByGroup).map(([group, teams]) => (
        <div key={genUniqueId()}>
          <h2 className="text-3xl">{group}</h2>
          <ul>
            {teams.map((team) => {
              return <li key={genUniqueId()}>{team.name}</li>;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TeamsSplit;
