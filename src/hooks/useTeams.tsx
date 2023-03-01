import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/api";

const useTeams = () => {
  const router = useRouter();
  const [tournamentId, setTournamentId] = useState("");
  const {
    data: participant,
    error: participantError,
    refetch: refetchParticipant,
    isLoading: isParticipantLoading,
  } = api.participant.getTournamentParticipant.useQuery({
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
    participant,
    tournamentId,
    participantError,
    refetchParticipant,
    isParticipantLoading,
  };
};

export default useTeams;
