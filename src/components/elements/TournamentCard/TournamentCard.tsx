import { type FC } from "react";
import useRedirect from "~/hooks/useRedirect";
import { type TournamentType } from "~/types/tournament.types";
import formatDate from "~/utils/formatDate";

interface TournamentCardProps {
  tournament: TournamentType;
}

const TournamentCard: FC<TournamentCardProps> = ({ tournament }) => {
  const { redirectToPath } = useRedirect();
  return (
    <button
      onClick={() => redirectToPath(`/tournaments/${tournament.id}`)}
      className="flex h-32 w-full items-start justify-start rounded-md border border-gray-300 p-4 text-left transition duration-300 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <h1 className="font-primary text-lg font-medium text-gray-900">
            {tournament.name}
          </h1>
          {/* <TournamentTypeIconDisplay tournamentType={tournament.type} /> */}
        </div>

        <div className="mt-2 flex space-x-3">
          <p className="rounded-md bg-gray-800 px-2 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {tournament.type}
          </p>
          <p className="rounded-md bg-gray-800 px-2 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {tournament.sets} sets
          </p>
          <p className="rounded-md bg-gray-800 px-2 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {formatDate(tournament.createdAt)}
          </p>
        </div>
      </div>
    </button>
  );
};

export default TournamentCard;
