import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import Spinner from "~/components/elements/Spinner/Spinner";
import useTournament from "~/hooks/useTournament";

const TournamentPage: NextPage = () => {
  const router = useRouter();
  const { isLoading, tournament, setTournamentId } = useTournament();

  useEffect(() => {
    if (router.query.id && typeof router.query.id === "string") {
      setTournamentId(router.query.id);
    }
  }, [router.query.id, setTournamentId]);

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <div>
      {console.log(tournament)}
      <PageHeadLine title={tournament?.name} />
    </div>
  );
};

export default TournamentPage;
