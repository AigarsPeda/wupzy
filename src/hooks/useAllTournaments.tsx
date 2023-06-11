import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const useAllTournaments = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.tournament.getAllTournaments.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return { tournaments: data?.tournaments, isLoading };
};

export default useAllTournaments;
