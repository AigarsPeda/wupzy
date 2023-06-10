import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import Spinner from "~/components/elements/Spinner/Spinner";
import { api } from "~/utils/api";

const TournamentPage: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data, isLoading } = api.tournament.getTournament.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id]);

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <div>
      <PageHeadLine title={data?.tournament?.name} />
    </div>
  );
};

export default TournamentPage;
