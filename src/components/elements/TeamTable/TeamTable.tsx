import { type FC } from "react";
import Table from "~/components/elements/Table/Table";
import useTeams from "~/hooks/useTeams";

const TeamTable: FC = () => {
  const { teams } = useTeams();

  return (
    <Table
      tableContents={teams}
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
