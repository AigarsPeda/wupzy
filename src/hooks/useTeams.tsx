import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";

const useTeams = () => {
  const router = useRouter();
  const [tournamentId, setTournamentId] = useState("");
  const {
    data: teams,
    error: teamsError,
    refetch: refetchTeams,
    isLoading: isTeamsLoading,
  } = api.teams.getTournamentTeams.useQuery({
    id: tournamentId,
  });

  useEffect(() => {
    if (
      !router.query.tournamentsId ||
      typeof router.query.tournamentsId !== "string"
    ) {
      return;
    }

    setTournamentId(router.query.tournamentsId);
  }, [router.query.tournamentsId]);

  return {
    teams,
    teamsError,
    refetchTeams,
    tournamentId,
    isTeamsLoading,
  };
};

export default useTeams;
