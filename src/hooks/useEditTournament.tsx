import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useRedirect from "~/hooks/useRedirect";
import { type NewTournamentType } from "~/types/tournament.types";
import { api } from "~/utils/api";

const useEditTournament = () => {
  const router = useRouter();
  const { redirectToPath } = useRedirect();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { mutate, isLoading: isUpdatingTournament } =
    api.tournament.updateTournament.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/tournaments/${data.id}`);
      },
    });
  const { data } = api.tournament.getTournamentToEdit.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  const updateTournament = (tournament: NewTournamentType) => {
    if (!tournamentId) return;

    mutate({
      id: tournamentId,
      tournament,
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
