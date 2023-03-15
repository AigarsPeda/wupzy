import { useRouter } from "next/router";
import type { FC } from "react";
import type { TournamentType } from "types/tournament.types";
import formatDate from "utils/formatDate";

interface TournamentCardProps {
  tournament: TournamentType;
}

const TournamentCard: FC<TournamentCardProps> = ({ tournament }) => {
  const router = useRouter();

  return (
    <button
      className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg transition-all duration-200 hover:bg-gray-100"
      onClick={() => {
        router.push(`/tournaments/${tournament.id}`).catch(() => {
          console.error("error changing route");
        });
      }}
    >
      <div className="flex flex-col space-y-3">
        <div className="mb-2 flex flex-col">
          <p className="text-sm text-gray-500">Name</p>
          <h3 className="text-lg font-semibold">{tournament.name}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Crated</p>
          <p className="text-sm">{formatDate(tournament.createdAt)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Winner</p>
          <p className="text-sm">
            {tournament.winner ? tournament.winner : "Not finished yet"}
          </p>
        </div>
      </div>
    </button>
  );
};

export default TournamentCard;
