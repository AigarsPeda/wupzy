import { type NextPage } from "next";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import Spinner from "~/components/elements/Spinner/Spinner";
import useTournamentGames from "~/hooks/useTournamentGames";
import useTournament from "../../hooks/useTournament";

const TournamentPage: NextPage = () => {
  const { tournament } = useTournament();

  const { games, isLoading, gamesScores, handleScoreSave, handleScoreChange } =
    useTournamentGames();

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <div>
      <PageHeadLine title={tournament?.name} />
      <DisplayGames
        games={games}
        gamesScores={gamesScores}
        handleScoreSave={handleScoreSave}
        handleScoreChange={handleScoreChange}
      />
    </div>
  );
};

export default TournamentPage;
