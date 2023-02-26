import type { Tournament } from "@prisma/client";
import type { FC } from "react";
import formatDate from "utils/formatDate";

interface TournamentProps {
  tournament: Tournament | undefined;
}

const TournamentHeader: FC<TournamentProps> = ({ tournament }) => {
  return (
    <div className="w-full">
      <p className="text-2xl">{tournament?.name}</p>
      <p className="text-sm text-gray-400">
        {formatDate(tournament?.updatedAt)}
      </p>
    </div>
  );
};

export default TournamentHeader;
