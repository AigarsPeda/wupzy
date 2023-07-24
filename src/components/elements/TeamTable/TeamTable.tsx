import { type FC } from "react";
import Table from "~/components/elements/Table/Table";
import { type TeamType } from "~/types/tournament.types";

interface TeamTableProps {
  teams: TeamType[];
  selectedGroup: string | null;
}

const TeamTable: FC<TeamTableProps> = ({ teams, selectedGroup }) => {
  const updateTeams = () => {
    // add players names to name column and return new array
    const teamsWithPlayersNames = teams.map((team) => {
      const playersNames = team.players?.map((player) => player.name);

      return {
        ...team,
        // participants: playersNames.join(", "),
        name: {
          name: team.name,
          // players: playersNames.join(", "),
          players: playersNames,
        },
      };
    });

    return teamsWithPlayersNames;
  };

  return (
    <Table
      tableContents={updateTeams().filter(
        (team) => team.group === selectedGroup
      )}
      exclude={[
        "id",
        "group",
        "players",
        "createdAt",
        "updatedAt",
        "tournamentId",
      ]}
    />
  );
};

export default TeamTable;
