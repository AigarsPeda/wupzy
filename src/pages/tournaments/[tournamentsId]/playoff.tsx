import Spinner from "components/elements/Spinner/Spinner";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";

const PlayOffPage: NextPage = () => {
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
      <p> PlayOffPage </p>
    </GridLayout>
  );
};

export default PlayOffPage;
