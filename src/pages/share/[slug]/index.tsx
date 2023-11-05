import { type NextPage } from "next";
import { AiOutlinePartition, AiOutlineTable } from "react-icons/ai";
import DisplayGroupSelect from "~/components/elements/DisplayGroupSelect/DisplayGroupSelect";
import DisplaySetScore from "~/components/elements/DisplaySetScore/DisplaySetScore";
import DisplaySharePlayoffGame from "~/components/elements/DisplaySharePlayoffGame/DisplaySharePlayoffGame";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHead from "~/components/elements/PageHead/PageHead";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import RegularShareTournament from "~/components/elements/RegularShareTournament/RegularShareTournament";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import useQueryValue from "~/hooks/useQueryValue";
import useShareLink from "~/hooks/useShareLink";
import getGamesLeft from "~/utils/getGamesLeft";
import organizePlayoffGames from "~/utils/organizePlayoffGames";

const TournamentPage: NextPage = () => {
  const { games, groups, players, teams, isLoading, tournament, playoffGames } =
    useShareLink();

  const [selectedGroup, updateSelectedGroup] = useQueryValue(
    groups[0] || "A",
    "group",
  );

  const [isPlayoffMode, updateIsPlayoffMode] = useQueryValue(
    "false",
    "isplayoffmode",
  );

  const isRegularTournamentSelected = () => {
    return isPlayoffMode === "false";
  };

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
        <div className="mt-4 flex items-center justify-between rounded py-1 md:mt-0">
          <div>
            <div className="flex">
              <div className="mr-4">
                <PageHeadLine title={tournament?.name} />
                {isRegularTournamentSelected() && (
                  <p className="text-xs text-gray-500">
                    {getGamesLeft(games, selectedGroup)} games left
                  </p>
                )}
              </div>
              {/* <div>
                <CircleProgress
                  progress={
                    getPercentagesOfFinishedGames(games, selectedGroup).progress
                  }
                />
              </div> */}
            </div>
            <div className="mb-4 mt-5">
              <DisplayGroupSelect
                groups={groups}
                selectedGroup={selectedGroup}
                setSelectedGroup={updateSelectedGroup}
              />
            </div>
          </div>

          {tournament?.isPlayoffs && (
            <Tooltip
              isNowrap
              position="md:right-0 -top-10"
              content={isRegularTournamentSelected() ? "Playoffs" : "Groups"}
            >
              <SmallButton
                color="dark"
                icon={
                  isRegularTournamentSelected() ? (
                    <AiOutlinePartition className="ml-2 h-6 w-6" />
                  ) : (
                    <AiOutlineTable className="ml-2 h-6 w-6" />
                  )
                }
                title={isRegularTournamentSelected() ? "Playoffs" : "Groups"}
                handleClick={() => {
                  updateIsPlayoffMode(
                    isPlayoffMode === "true" ? "false" : "true",
                  );
                }}
              />
            </Tooltip>
          )}
        </div>
      )}

      {isPlayoffMode === "true" ? (
        <PlayoffsTree
          playoffTree={organizePlayoffGames(playoffGames)}
          displayTeamsComponent={({ team, isLast, isBothTeams, teamScore }) => {
            return (
              <DisplaySharePlayoffGame
                isLast={isLast}
                teamName={team.name}
                teamScore={teamScore}
                isBothTeams={isBothTeams}
              />
            );
          }}
          gameOptions={({ gameSets, teamOneName, teamTwoName }) => {
            return (
              <div className="mt-3">
                <DisplaySetScore
                  gameSets={gameSets}
                  teamOneName={teamOneName}
                  teamTwoName={teamTwoName}
                />
              </div>
            );
          }}
        />
      ) : (
        <RegularShareTournament
          teams={teams}
          games={games}
          // groups={groups}
          players={players}
          isLoading={isLoading}
          selectedGroup={selectedGroup}
          // setSelectedGroup={updateSelectedGroup}
          tournamentType={tournament?.type || "king"}
        />
      )}
    </>
  );
};

export default TournamentPage;
