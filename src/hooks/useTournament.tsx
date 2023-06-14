import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/router";

const useTournament = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading } = api.tournament.getTournament.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  return { tournament: data?.tournament, isLoading };
};

export default useTournament;
