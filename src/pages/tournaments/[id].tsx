import { type NextPage } from "next";
import { useState } from "react";
import { AiOutlinePartition, AiOutlineTable } from "react-icons/ai";
import CircleProgress from "~/components/elements/CircleProgress/CircleProgress";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHead from "~/components/elements/PageHead/PageHead";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import PlayoffTournament from "~/components/elements/PlayoffTournament/PlayoffTournament";
import RegularTournament from "~/components/elements/RegularTournament/RegularTournament";
import SettingDropdown from "~/components/elements/SettingDropdown/SettingDropdown";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import useQueryValue from "~/hooks/useQueryValue";
import useTournament from "~/hooks/useTournament";
import useTournamentGames from "~/hooks/useTournamentGames";
import getGamesLeft from "~/utils/getGamesLeft";
import getPercentagesOfFinishedGames from "~/utils/getPercentagesOfFinishedGames";

const TournamentPage: NextPage = () => {
  // TODO: Fetch games only for selected group
  const { games, groups } = useTournamentGames();
  const [isQRModal, setIsQRModal] = useState(false);
  const { tournament, isLoading: isTournamentLoading } = useTournament();
  const [selectedGroup, updateSelectedGroup] = useQueryValue(
    groups[0] || "A",
    "group"
  );
  const [isPlayoffMode, updateIsPlayoffMode] = useQueryValue(
    "false",
    "isplayoffmode"
  );

  const isRegularTournamentSelected = () => {
    return isPlayoffMode === "false";
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
      {isTournamentLoading || !games ? (
        <LoadingSkeleton classes="mt-2 h-14 w-72" />
      ) : (
        <div className="mt-4 items-center rounded py-1 md:mt-0 md:flex md:justify-between">
          <div className="flex items-center justify-between space-x-4">
            <div className="max-w-[16rem] md:max-w-none">
              <PageHeadLine title={tournament?.name} />
              {isRegularTournamentSelected() && (
                <p className="text-sm text-gray-500">
                  {getGamesLeft(games, selectedGroup)} games left
                </p>
              )}
            </div>
            <div className="h-14 w-14">
              {isRegularTournamentSelected() && (
                <CircleProgress
                  progress={
                    getPercentagesOfFinishedGames(games, selectedGroup).progress
                  }
                />
              )}
            </div>
          </div>

          <div className="mt-4 flex w-full justify-end space-x-2 md:mt-0">
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
                      isPlayoffMode === "true" ? "false" : "true"
                    );
                  }}
                />
              </Tooltip>
            )}
            <SettingDropdown />
          </div>
        </div>
      )}

      {isRegularTournamentSelected() ? (
        <RegularTournament
          selectedGroup={selectedGroup}
          updateSelectedGroup={updateSelectedGroup}
          tournamentType={tournament?.type || "king"}
        />
      ) : (
        <PlayoffTournament tournamentId={tournament?.id} />
      )}
    </>
  );
};

export default TournamentPage;
