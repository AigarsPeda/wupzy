import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const useTournament = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading, refetch } = api.tournament.getTournament.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );
  const {
    mutate: upTournamentToPro,
    isLoading: isUpdatingKind,
    error: errorUpdatingKind,
  } = api.tournament.updateTournamentToPro.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const { mutate: delTournament, isLoading: isDeleting } =
    api.tournament.deleteTournament.useMutation({
      onSuccess: async () => {
        await router.push("/tournaments");
      },
    });

  const updateTournamentToPro = () => {
    if (tournamentId) {
      upTournamentToPro({
        id: tournamentId,
      });
    }
  };

  const deleteTournament = () => {
    if (tournamentId) {
      delTournament({
        id: tournamentId,
      });
    }
  };

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  return {
    isLoading,
    isDeleting,
    isUpdatingKind,
    deleteTournament,
    updateTournamentToPro,
    tournament: data?.tournament,
    errorUpdatingKind: errorUpdatingKind?.message,
    isKingTournament: data?.tournament?.type === "king",
  };
};

export default useTournament;
