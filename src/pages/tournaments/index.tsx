import Spinner from "components/elements/Spinner/Spinner";
import TournamentCard from "components/elements/TournamentCard/TournamentCard";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";

const TournamentsPage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const res = api.tournaments.getAllTournaments.useQuery(undefined, {
    suspense: false,
    retry: 2,
  });

  useEffect(() => {
    if (!res.isLoading && res.error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", window.location.pathname);
    }
  }, [redirectToPath, res.error?.data?.code, res.isLoading]);

  if (res.isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <GridLayout minWith="320" isGap>
      {res.data && res.data.tournaments.length > 0 ? (
        res.data.tournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))
      ) : (
        <p>No tournaments</p>
      )}
    </GridLayout>
  );
};

export default TournamentsPage;
