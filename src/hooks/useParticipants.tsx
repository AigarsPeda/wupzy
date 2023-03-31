import { api } from "utils/api";

const useParticipants = (id: string) => {
  const {
    data: participants,
    error: participantsError,
    refetch: refetchParticipants,
    isLoading: isParticipantsLoading,
  } = api.tournaments.getAllTournamentParticipants.useQuery({
    id,
  });

  return {
    participants,
    participantsError,
    refetchParticipants,
    isParticipantsLoading,
  };
};

export default useParticipants;
