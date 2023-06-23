import { type NextPage } from "next";
import CircleProgress from "~/components/elements/CircleProgress/CircleProgress";
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

  const getPercentagesOfFinishedGames = () => {
    if (!games) {
      return {
        progress: 0,
        finishedGames: [],
      };
    }

    const finishedGames = games.filter((game) => game.winnerId);
    const progress = Math.round((finishedGames.length / games.length) * 100);

    return {
      progress,
      finishedGames,
    };
  };

  const getGamesLeft = () => {
    if (!games) {
      return 0;
    }

    return games.length - getPercentagesOfFinishedGames().finishedGames.length;
  };

  return (
    <div>
      {isTournamentLoading ? (
        <LoadingSkeleton classes="mt-2 h-14 w-72" />
      ) : (
        <div className="mt-4 flex items-center space-x-4 rounded px-3 py-1 md:mt-0">
          <div>
            <PageHeadLine title={tournament?.name} />
            <p className="text-sm text-gray-500">{getGamesLeft()} games left</p>
          </div>
          <CircleProgress progress={getPercentagesOfFinishedGames().progress} />
        </div>
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
