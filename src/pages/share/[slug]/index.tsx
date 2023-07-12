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
import useShareLink from "~/hooks/useShareLink";
import getGamesLeft from "~/utils/getGamesLeft";
import getPercentagesOfFinishedGames from "~/utils/getPercentagesOfFinishedGames";

const TournamentPage: NextPage = () => {
  const [selectedGroup, setSelectedGroup] = useState("A");
  const { games, groups, players, teams, isLoading, tournament } =
    useShareLink();

  return (
    <>
      <PageHead
        title={`Wupzy | ${tournament?.name || "Share"}`}
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
        tournament tables, save game scores, view real-time results, and share
        them with all participants in just a few clicks."
      />
      {isLoading || !games ? (
        <LoadingSkeleton classes="mt-2 h-14 w-72" />
      ) : (
        <div className="mt-4 flex items-center space-x-4 rounded py-1 md:mt-0">
          <div className="max-w-[16rem] md:max-w-none">
            <PageHeadLine title={tournament?.name} />
            <p className="text-sm text-gray-500">
              {getGamesLeft(games, selectedGroup)} games left
            </p>
          </div>
          <CircleProgress
            progress={
              getPercentagesOfFinishedGames(games, selectedGroup).progress
            }
          />
        </div>
      )}

      <DisplayGroupSelect
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <DisplayGames
        gamesScores={[]}
        isGamesLoading={isLoading}
        games={games?.filter((game) => game.group === selectedGroup)}
      />
      <div className="mt-5">
        {tournament?.type === "king" ? (
          <PlayerTable selectedGroup={selectedGroup} players={players} />
        ) : (
          <TeamTable selectedGroup={selectedGroup} teams={teams} />
        )}
      </div>
    </>
  );
};

export default TournamentPage;
