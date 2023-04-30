import PageHead from "components/elements/PageHead/PageHead";
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

  return (
    <>
      <PageHead
        title="Wupzy | Tournaments"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />

      {isFetching || isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export default TournamentsPage;
