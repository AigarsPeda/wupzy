import Spinner from "components/elements/Spinner/Spinner";
import TournamentCard from "components/elements/TournamentCard/TournamentCard";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";

const TournamentsPage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const { data, error, isLoading, isFetching, refetch } =
    api.tournaments.getAllTournaments.useQuery(undefined, {
      suspense: false,
      retry: 2,
    });

  useEffect(() => {
    if (!isLoading && error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [redirectToPath, error?.data?.code, isLoading]);

  if (isFetching || isLoading) {
    return <Spinner />;
  }

  return (
    <GridLayout minWith="320" isGap>
      {data && data.tournaments.length > 0 ? (
        data.tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            isPlayoff={Boolean(tournament.isPlayoff)}
            refetch={() => {
              refetch().catch((err) => {
                console.log(err);
              });
            }}
          />
        ))
      ) : (
        <p>No tournaments</p>
      )}
    </GridLayout>
  );
};

export default TournamentsPage;
