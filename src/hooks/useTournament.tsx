import { api } from "utils/api";

const useTournament = (id: string) => {
  const {
    data: tournament,
    refetch: refetchTournament,
    isLoading: isTournamentLoading,
  } = api.tournaments.getTournamentById.useQuery({ id }, { enabled: !!id });

  return { tournament, refetchTournament, isTournamentLoading };
};

export default useTournament;
