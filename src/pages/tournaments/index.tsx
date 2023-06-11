import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Spinner from "~/components/elements/Spinner/Spinner";
import TournamentCard from "~/components/elements/TournamentCard/TournamentCard";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import { api } from "~/utils/api";

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
        return <TournamentCard tournament={tournament} key={tournament.id} />;
      })}
    </GridLayout>
  );
};

export default TournamentsPage;
