import type { Tournament } from "@prisma/client";
import EditTournament from "components/containers/EditTournament/EditTournament";
import type { FC } from "react";
import formatDate from "utils/formatDate";

interface TournamentProps {
  tournament: Tournament | undefined;
}

const TournamentHeader: FC<TournamentProps> = ({ tournament }) => {
  return (
    <div className="mb-4 flex justify-between">
      <div>
        <p className="text-2xl">{tournament?.name}</p>
        <p className="text-sm text-gray-400">
          {formatDate(tournament?.updatedAt)}
        </p>
      </div>
      <div>
        <EditTournament />
      </div>
      <div className="w-40"></div>
    </div>
  );
};

export default TournamentHeader;
