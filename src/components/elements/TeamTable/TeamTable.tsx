import { type FC } from "react";
import Table from "~/components/elements/Table/Table";
import useTeams from "~/hooks/useTeams";

interface TeamTableProps {
  selectedGroup: string;
}

const TeamTable: FC<TeamTableProps> = ({ selectedGroup }) => {
  const { teams } = useTeams();

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
