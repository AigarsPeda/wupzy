import { type NextPage } from "next";
import Spinner from "~/components/elements/Spinner/Spinner";
import TournamentCard from "~/components/elements/TournamentCard/TournamentCard";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import useAllTournaments from "~/hooks/useAllTournaments";

const TournamentsPage: NextPage = () => {
  const { isLoading, tournaments } = useAllTournaments();

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <GridLayout isGap minWith="250">
      {tournaments?.map((tournament) => {
        return <TournamentCard tournament={tournament} key={tournament.id} />;
      })}
    </GridLayout>
  );
};

export default TournamentsPage;
