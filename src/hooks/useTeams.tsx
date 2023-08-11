import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const useTeams = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading, refetch, isFetched } = api.teams.getTeams.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  return {
    refetch,
    isFetched,
    isLoading,
    tournamentId,
    teams: data?.teams || [],
  };
};

export default useTeams;
