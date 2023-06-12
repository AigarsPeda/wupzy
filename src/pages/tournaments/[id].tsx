import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import Spinner from "~/components/elements/Spinner/Spinner";
import useTournament from "~/hooks/useTournament";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";

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
      <PageHeadLine title={tournament?.name} />
      <DisplayGames games={tournament?.games} />
      {/* <div>
        {tournament?.games.map((game) => {
          return (
            <div key={game.id}>
              <div className="flex space-x-1">
                <p>{game.teamOne.name}</p>
                <p>VS</p>
                <p>{game.teamTwo.name}</p>
              </div>
              <div className="flex space-x-1">
                <p>{game.teamOneScore}</p>
                <p>VS</p>
                <p>{game.teamTwoScore}</p>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default TournamentPage;
