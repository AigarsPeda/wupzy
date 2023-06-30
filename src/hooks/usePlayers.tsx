import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";

const usePlayers = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading } = api.player.getPlayers.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  return { players: data?.players, isLoading, tournamentId };
};

export default usePlayers;
