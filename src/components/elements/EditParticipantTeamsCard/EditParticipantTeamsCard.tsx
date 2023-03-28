import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useEffect } from "react";
import { api } from "utils/api";
import createTeamsMap from "utils/createTeamsMap";

interface EditParticipantTeamsCardProps {
  tournamentId: string;
}

const EditParticipantTeamsCard: FC<EditParticipantTeamsCardProps> = ({
  tournamentId,
}) => {
  const { data: teams, refetch: refetchGames } =
    api.tournaments.getTournamentTeams.useQuery({ tournamentId });

  useEffect(() => {
    if (!teams) return;

    console.log("teams --->", teams);
    console.log("teamsMap --->", createTeamsMap(teams.teams));
  }, [teams]);

  return (
    <GridLayout isGap minWith="350">
      {[...createTeamsMap(teams?.teams)].map(([group, teams]) => (
        <div key={group}>
          <h2>{group}</h2>
          <ul>
            {teams.map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </GridLayout>
  );
};

export default EditParticipantTeamsCard;
