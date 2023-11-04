import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const useTournament = () => {
  const router = useRouter();
  const { player } = api.useUtils();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading, refetch } = api.tournament.getTournament.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  const {
    error: errorUpdatingKind,
    mutate: upTournamentToPro,
    // isLoading: isUpdatingToPro,
  } = api.tournament.updateTournamentToPro.useMutation({
    onSuccess: async () => {
      await refetch();
      await player.invalidate();
    },
  });
  const { mutate: delTournament } = api.tournament.deleteTournament.useMutation(
    {
      onSuccess: async () => {
        await router.push("/tournaments");
      },
    }
  );

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
    refetch,
    isLoading,
    // isDeleting,
    sessionData,
    // isUpdatingToPro,
    deleteTournament,
    updateTournamentToPro,
    tournament: data?.tournament,
    errorUpdatingKind: errorUpdatingKind?.message,
    isKingTournament: data?.tournament?.type === "king",
  };
};

export default useTournament;
