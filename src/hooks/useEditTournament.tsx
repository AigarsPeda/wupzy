import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type NewTournamentType } from "~/types/tournament.types";
import { api } from "~/utils/api";

const useEditTournament = () => {
  const router = useRouter();

  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { teams, player, game: games } = api.useContext();
  const { mutate, isLoading: isUpdatingTournament } =
    api.tournament.updateTournament.useMutation({
      onSuccess: () => {
        void games.invalidate();
        void teams.invalidate();
        void player.invalidate();
      },
    });
  const { data } = api.tournament.getTournamentToEdit.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  const updateTournament = (tournament: NewTournamentType) => {
    if (!tournamentId) return;

    mutate({
      tournament,
      id: tournamentId,
    });
  };

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  return {
    updateTournament,
    isUpdatingTournament,
    tournamentId: tournamentId,
    tournament: data?.tournament,
  };
};

export default useEditTournament;
