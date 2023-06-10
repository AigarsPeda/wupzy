import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import { api } from "~/utils/api";

const TournamentsPage: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data } = api.tournament.getAllTournaments.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div>
      {data?.tournaments?.map((tournament) => {
        return (
          <div key={tournament.id}>
            <PageHeadLine title={tournament.name} />
          </div>
        );
      })}
    </div>
  );
};

export default TournamentsPage;
