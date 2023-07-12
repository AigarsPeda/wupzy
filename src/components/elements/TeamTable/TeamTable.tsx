import { type FC } from "react";
import Table from "~/components/elements/Table/Table";
import { type TeamType } from "~/types/tournament.types";

interface TeamTableProps {
  teams: TeamType[];
  selectedGroup: string | null;
}

const TeamTable: FC<TeamTableProps> = ({ teams, selectedGroup }) => {
  return (
    <Table
      tableContents={teams.filter((team) => team.group === selectedGroup)}
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
