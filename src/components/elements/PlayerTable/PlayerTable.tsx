import Table from "~/components/elements/Table/Table";
import usePlayers from "~/hooks/usePlayers";

const PlayerTable = () => {
  const { players } = usePlayers();

  return (
    <Table
      tableContents={players}
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

export default PlayerTable;
