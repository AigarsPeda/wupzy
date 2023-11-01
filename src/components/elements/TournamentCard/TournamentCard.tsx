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
      className="flex w-full items-start justify-start rounded-lg border border-gray-100 bg-white p-4 text-left shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] transition duration-300 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
    >
      <div className="flex h-full w-full flex-col justify-between">
        <h1 className="truncate font-primary text-3xl font-normal text-gray-900">
          {tournament.name}
        </h1>

        <div className="mt-3 flex space-x-2">
          <p className="rounded-md bg-gray-900 px-2.5 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {tournament.type}
          </p>
          <p className="rounded-md bg-gray-900 px-2.5 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {tournament.isPlayoffs ? "Playoffs" : "Regular"}
          </p>
          <p className="rounded-md bg-gray-900 px-2.5 py-1 font-primary text-xs font-normal capitalize text-gray-50">
            {tournament.sets} sets
          </p>
        </div>
        <div className="mt-6 flex w-24 items-center justify-start">
          <p className="rounded-md bg-gray-50 px-2.5 py-1 font-primary text-xs capitalize text-gray-500">
            {formatDate(tournament.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
