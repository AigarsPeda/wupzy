import { type FC } from "react";
import Table from "~/components/elements/Table/Table";
import { type PlayerType } from "~/types/tournament.types";

interface PlayerTableProps {
  players: PlayerType[];
  selectedGroup: string;
}

const PlayerTable: FC<PlayerTableProps> = ({ players, selectedGroup }) => {
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
