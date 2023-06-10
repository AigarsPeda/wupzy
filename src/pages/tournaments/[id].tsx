import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import { useSession } from "next-auth/react";

const TournamentPage: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [tournamentId, setTournamentId] = useState("");
  const { data } = api.tournament.getTournament.useQuery(
    { id: tournamentId },
    { enabled: Boolean(tournamentId) && sessionData?.user !== undefined }
  );

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (data) {
      console.log("data.tournament -->", data);
    }
  }, [data]);

  return (
    <div>
      <PageHeadLine title={data?.tournament?.name} />
    </div>
  );
};

export default TournamentPage;
