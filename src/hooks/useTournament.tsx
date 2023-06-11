import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";

const useTournament = () => {
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading } = api.tournament.getTournament.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  return { tournament: data?.tournament, isLoading, setTournamentId };
};

export default useTournament;
