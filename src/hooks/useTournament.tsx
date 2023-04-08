import { api } from "utils/api";

const useTournament = (tournamentId: string) => {
  const {
    data: tournament,
    error: tournamentError,
    refetch: refetchTournament,
    isLoading: isTournamentLoading,
  } = api.tournaments.getTournamentById.useQuery(
    { tournamentId },
    { enabled: !!tournamentId }
  );

  return {
    tournament,
    tournamentError,
    refetchTournament,
    isTournamentLoading,
  };
};

export default useTournament;
