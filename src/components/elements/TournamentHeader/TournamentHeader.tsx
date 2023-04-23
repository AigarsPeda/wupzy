import type { FC } from "react";
import type { TournamentType } from "types/tournament.types";
import formatDate from "utils/formatDate";
import useWindowSize from "../../../hooks/useWindowSize";

interface TournamentProps {
  tournament: TournamentType | undefined;
}

const TournamentHeader: FC<TournamentProps> = ({ tournament }) => {
  const { windowSize } = useWindowSize();
  return (
    <div>
      {windowSize.width > 560 && (
        <>
          <p className="text-2xl">{tournament?.name}</p>
          <p className="text-sm text-gray-400">
            {formatDate(tournament?.updatedAt)}
          </p>
        </>
      )}
    </div>
  );
};

export default TournamentHeader;
