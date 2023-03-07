import type { FC } from "react";
import type { TournamentType } from "types/tournament.types";
import formatDate from "utils/formatDate";

interface TournamentProps {
  tournament: TournamentType | undefined;
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
