import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type NewTournamentType } from "~/types/tournament.types";
import { api } from "~/utils/api";

const useEditTournament = () => {
  const router = useRouter();
  const [group, setGroup] = useState("A");
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { teams, player, game: games, tournament } = api.useContext();
  const { mutate, isLoading: isUpdatingTournament } =
    api.tournament.updateTournament.useMutation({
      onSuccess: () => {
        void games.invalidate();
        void teams.invalidate();
        void player.invalidate();
        void tournament.invalidate();
      },
    });
  const { data, isLoading: isGroupLoading } =
    api.tournament.getTournamentToEdit.useQuery(
      { id: tournamentId, group },
      { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
    );

  const updateTournament = (tournament: NewTournamentType) => {
    if (!tournamentId) return;

    mutate({
      group,
      tournament,
      id: tournamentId,
    });
  };

  useEffect(() => {
    if (router.query.group && typeof router.query.group === "string") {
      setGroup(router.query.group);
    }
  }, [router.query.group, setGroup]);

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  return {
    isGroupLoading,
    updateTournament,
    isUpdatingTournament,
    tournamentId: tournamentId,
    tournament: data?.tournament,
  };
};

export default useEditTournament;
