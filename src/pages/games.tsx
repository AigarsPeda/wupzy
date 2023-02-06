import Spinner from "components/elements/Spinner/Spinner";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";
import removeCookieByName from "utils/removeCookieByName";

const GamesPage: NextPage = () => {
  const { mutate } = api.users.logoutUser.useMutation();
  const res = api.games.getAllGames.useQuery(undefined, {
    suspense: false,
    retry: 2,
  });

  const { redirectToPath } = useRedirect();

  useEffect(() => {
    console.log("res", res);
  }, [res]);

  useEffect(() => {
    if (!res.isLoading && res.error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", true);
    }
  }, [redirectToPath, res.error?.data?.code, res.isLoading, res.isError]);

  if (res.isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <div>
      <h1>Games</h1>
      <button
        onClick={() => {
          mutate();
          removeCookieByName("token");
          redirectToPath("/login", true);
        }}
      >
        Log out
      </button>
      <p>{res.data?.greeting}</p>
    </div>
  );
};

export default GamesPage;
