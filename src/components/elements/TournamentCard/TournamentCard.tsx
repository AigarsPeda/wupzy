import Link from "next/link";
import { type FC } from "react";
import TournamentTypeIconDisplay from "~/components/elements/TournamentTypeIconDisplay/TournamentTypeIconDisplay";
import { type TournamentType } from "~/types/tournament.types";
import { api } from "~/utils/api";
import formatDate from "~/utils/formatDate";

interface TournamentCardProps {
  tournament: TournamentType;
}

const TournamentCard: FC<TournamentCardProps> = ({ tournament }) => {
  const { data } = api.tournament.getTournamentGroups.useQuery({
    tournamentId: tournament.id,
  });

  return (
    <Link
      href={{
        pathname: `/tournaments/${tournament.id}`,
        query: { group: data?.groups[0], isplayoffmode: tournament.isPlayoffs },
      }}
      className="flex w-full items-start justify-start rounded-md border border-gray-300 p-4 text-left transition duration-300 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-center space-x-1">
          <TournamentTypeIconDisplay tournamentType={tournament.type} />
          <p className="rounded-md px-2 py-1 font-primary text-xs font-semibold capitalize text-gray-700">
            {tournament.type}
          </p>
        </div>
        <h1 className="truncate py-5 font-primary text-xl font-medium text-gray-900">
          {tournament.name}
        </h1>

        <div className="mt-2 flex space-x-3">
          <p className="rounded-md bg-gray-400 px-2 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {tournament.sets} sets
          </p>
          <p className="rounded-md bg-gray-400 px-2 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {formatDate(tournament.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
