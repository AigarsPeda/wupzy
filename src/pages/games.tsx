import Spinner from "components/elements/Spinner/Spinner";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "utils/api";

const GamesPage: NextPage = () => {
  const router = useRouter();
  const { mutate } = api.users.logoutUser.useMutation();
  const { data, isFetching, error } = api.games.getAllGames.useQuery(
    { text: "from tRPC2" },
    { suspense: false, retry: 0 }
  );

  useEffect(() => {
    error?.data?.code === "UNAUTHORIZED" && router.push("/login");
  }, [router, error?.data?.code]);

  if (isFetching) {
    return <Spinner size="small" />;
  }

  return (
    <div>
      <h1>Games</h1>
      <button
        onClick={() => {
          mutate();
        }}
      >
        Log out
      </button>
      <p>{data?.greeting}</p>
    </div>
  );
};

export default GamesPage;
