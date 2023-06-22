import { type NextPage } from "next";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import PlayerTable from "~/components/elements/PlayerTable/PlayerTable";
import TeamTable from "~/components/elements/TeamTable/TeamTable";
import useTournament from "~/hooks/useTournament";
import useTournamentGames from "~/hooks/useTournamentGames";

const TournamentPage: NextPage = () => {
  const { tournament, isLoading: isTournamentLoading } = useTournament();
  const { games, isLoading, gamesScores, handleScoreSave, handleScoreChange } =
    useTournamentGames();

  return (
    <div>
      {isTournamentLoading ? (
        <LoadingSkeleton classes="mt-2 h-14 w-72" />
      ) : (
        <PageHeadLine title={tournament?.name} />
      )}

      <DisplayGames
        games={games || []}
        gamesScores={gamesScores}
        isGamesLoading={isLoading}
        handleScoreSave={handleScoreSave}
        handleScoreChange={handleScoreChange}
      />

      <div className="mt-5">
        {tournament?.type === "king" ? <PlayerTable /> : <TeamTable />}
      </div>
    </div>
  );
};

export default TournamentPage;
