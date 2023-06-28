import { type NextPage } from "next";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHead from "~/components/elements/PageHead/PageHead";
import TournamentCard from "~/components/elements/TournamentCard/TournamentCard";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import useAllTournaments from "~/hooks/useAllTournaments";

const TournamentsPage: NextPage = () => {
  const { isLoading, tournaments } = useAllTournaments();

  if (tournaments?.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mt-10 text-3xl text-gray-400">No tournaments found</h1>
      </div>
    );
  }

  return (
    <>
      <PageHead
        title="Wupzy | Tournaments"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
      tournament tables, save game scores, view real-time results, and share
      them with all participants in just a few clicks."
      />
      <GridLayout isGap minWith="250">
        {isLoading ? (
          <>
            {[...Array(4).keys()].map((_, index) => (
              <LoadingSkeleton key={index} classes="h-36 w-full" />
            ))}
          </>
        ) : (
          tournaments?.map((tournament) => {
            return (
              <TournamentCard tournament={tournament} key={tournament.id} />
            );
          })
        )}
      </GridLayout>
    </>
  );
};

export default TournamentsPage;
