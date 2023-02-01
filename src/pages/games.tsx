import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";

const GamesPage: NextPage = () => {
  const router = useRouter();
  const secretGames = api.games.getAllGames.useQuery({ text: "from tRPC2" });

  useEffect(() => {
    secretGames.error?.data?.code === "UNAUTHORIZED" && router.push("/login");
  }, [router, secretGames.error?.data?.code]);

  return (
    <div>
      <h1>Games</h1>
      <p>{secretGames.data?.greeting}</p>
    </div>
  );
};

export default GamesPage;
