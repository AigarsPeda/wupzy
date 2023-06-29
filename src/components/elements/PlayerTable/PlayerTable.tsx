import { type FC } from "react";
import Table from "~/components/elements/Table/Table";
import usePlayers from "~/hooks/usePlayers";

interface PlayerTableProps {
  selectedGroup: string;
}

const PlayerTable: FC<PlayerTableProps> = ({ selectedGroup }) => {
  const { players } = usePlayers();

  return (
    <Table
      tableContents={players?.filter(
        (player) => player.group === selectedGroup
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

export default PlayerTable;
