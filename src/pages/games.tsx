import Spinner from "components/elements/Spinner/Spinner";
import useRedirect from "hooks/useRedirect";
import type { NextPage } from "next";
import { useEffect } from "react";
import { api } from "utils/api";
import removeCookieByName from "utils/removeCookieByName";

const GamesPage: NextPage = () => {
  const { mutate } = api.users.logoutUser.useMutation();
  const { data, isFetching, error, isFetched } = api.games.getAllGames.useQuery(
    undefined,
    { suspense: false, retry: 0 }
  );

  const { redirectToPath } = useRedirect();

  useEffect(() => {
    if (isFetched && error?.data?.code === "UNAUTHORIZED") {
      redirectToPath("/login", true);
    }
  }, [error, isFetched, redirectToPath]);

  if (isFetching) {
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
      <p>{data?.greeting}</p>
    </div>
  );
};

export default GamesPage;
