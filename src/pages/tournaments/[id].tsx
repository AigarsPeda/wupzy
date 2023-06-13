import { type NextPage } from "next";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import Spinner from "~/components/elements/Spinner/Spinner";
import useTournamentGames from "~/hooks/useTournamentGames";

const TournamentPage: NextPage = () => {
  const {
    games,
    isLoading,
    tournamentName,
    handleScoreSave,
    handleScoreChange,
  } = useTournamentGames();

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <div>
      <PageHeadLine title={tournamentName} />
      <DisplayGames
        games={games}
        handleScoreSave={handleScoreSave}
        handleScoreChange={handleScoreChange}
      />
    </div>
  );
};

export default TournamentPage;
