import { api } from "utils/api";

const useTournament = (id: string) => {
  const {
    data: tournament,
    error: tournamentError,
    refetch: refetchTournament,
    isLoading: isTournamentLoading,
  } = api.tournaments.getTournamentById.useQuery({ id }, { enabled: !!id });

  return {
    tournament,
    tournamentError,
    refetchTournament,
    isTournamentLoading,
  };
};

export default useTournament;
