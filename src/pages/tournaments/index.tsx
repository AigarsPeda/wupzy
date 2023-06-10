import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import Spinner from "~/components/elements/Spinner/Spinner";
import { api } from "~/utils/api";
import GridLayout from "~/components/layout/GridLayout/GridLayout";

const TournamentsPage: NextPage = () => {
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
          <div
            key={tournament.id}
            className="h-full w-full rounded-md bg-gray-100 p-2"
          >
            <div className="">
              <span className="rounded-md bg-gray-300 px-2 py-1 font-primary text-sm font-semibold capitalize text-gray-700">
                {tournament.type}
              </span>
            </div>
          </div>
        );
      })}
    </GridLayout>
  );
};

export default TournamentsPage;
