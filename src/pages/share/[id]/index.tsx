import { type NextPage } from "next";
import { useState } from "react";
import CircleProgress from "~/components/elements/CircleProgress/CircleProgress";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import DisplayGroupSelect from "~/components/elements/DisplayGroupSelect/DisplayGroupSelect";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHead from "~/components/elements/PageHead/PageHead";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import PlayerTable from "~/components/elements/PlayerTable/PlayerTable";
import TeamTable from "~/components/elements/TeamTable/TeamTable";
import useTournament from "~/hooks/useTournament";
import useTournamentGames from "~/hooks/useTournamentGames";

const TournamentPage: NextPage = () => {
  const { tournament, isLoading: isTournamentLoading } = useTournament();
  const {
    games,
    groups,
    isLoading,
    gamesScores,
    handleScoreSave,
    handleScoreChange,
  } = useTournamentGames();
  const [selectedGroup, setSelectedGroup] = useState("A");

  const getPercentagesOfFinishedGames = () => {
    if (!games) {
      return {
        progress: 0,
        finishedGames: [],
      };
    }

    const finishedGames = games.filter(
      (game) => game.winnerId && game.group === selectedGroup
    );

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

    return (
      games.filter((game) => game.group === selectedGroup).length -
      getPercentagesOfFinishedGames().finishedGames.length
    );
  };

  return (
    <>
      <PageHead
        title={`Wupzy | ${tournament?.name || "Tournament"}`}
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
        tournament tables, save game scores, view real-time results, and share
        them with all participants in just a few clicks."
      />
      {isTournamentLoading ? (
        <LoadingSkeleton classes="mt-2 h-14 w-72" />
      ) : (
        <div className="mt-4 flex items-center space-x-4 rounded py-1 md:mt-0">
          <div className="max-w-[16rem] md:max-w-none">
            <PageHeadLine title={tournament?.name} />
            <p className="text-sm text-gray-500">{getGamesLeft()} games left</p>
          </div>
          <CircleProgress progress={getPercentagesOfFinishedGames().progress} />
        </div>
      )}
      Share
      {/* <DisplayGroupSelect
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />

      <DisplayGames
        gamesScores={gamesScores}
        isGamesLoading={isLoading}
        handleScoreSave={handleScoreSave}
        handleScoreChange={handleScoreChange}
        games={games?.filter((game) => game.group === selectedGroup) || []}
      />

      <div className="mt-5">
        {tournament?.type === "king" ? (
          <PlayerTable selectedGroup={selectedGroup} />
        ) : (
          <TeamTable selectedGroup={selectedGroup} />
        )}
      </div> */}
    </>
  );
};

export default TournamentPage;
