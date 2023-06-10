import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Spinner from "~/components/elements/Spinner/Spinner";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import { api } from "~/utils/api";
import formatDate from "~/utils/formatDate";
import useRedirect from "~/hooks/useRedirect";

const TournamentsPage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const { data: sessionData } = useSession();

  const { data, isLoading } = api.tournament.getAllTournaments.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <GridLayout isGap minWith="250">
      {data?.tournaments?.map((tournament) => {
        return (
          <button
            key={tournament.id}
            onClick={() => redirectToPath(`/tournaments/${tournament.id}`)}
            className="flex h-32 w-full items-start justify-start rounded-md border border-gray-300 p-4 text-left transition duration-300 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
          >
            <div className="flex h-full w-full flex-col justify-between">
              <div>
                <h1 className="font-primary text-lg font-medium text-gray-900">
                  {tournament.name}
                </h1>
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
      })}
    </GridLayout>
  );
};

export default TournamentsPage;
