import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import CircleProgress from "~/components/elements/CircleProgress/CircleProgress";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import DisplayGroupSelect from "~/components/elements/DisplayGroupSelect/DisplayGroupSelect";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import PageHead from "~/components/elements/PageHead/PageHead";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";
import PlayerTable from "~/components/elements/PlayerTable/PlayerTable";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import TeamTable from "~/components/elements/TeamTable/TeamTable";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import usePlayers from "~/hooks/usePlayers";
import useSelectedValueQuery from "~/hooks/useSelectedValueQuery";
import useTeams from "~/hooks/useTeams";
import useTournament from "~/hooks/useTournament";
import useTournamentGames from "~/hooks/useTournamentGames";
import getGamesLeft from "~/utils/getGamesLeft";
import getPercentagesOfFinishedGames from "~/utils/getPercentagesOfFinishedGames";

const QRModal = dynamic(() => import("~/components/elements/QRModal/QRModal"));

const TournamentPage: NextPage = () => {
  const { teams } = useTeams();
  const { players } = usePlayers();
  const [isQRModal, setIsQRModal] = useState(false);
  const { tournament, isLoading: isTournamentLoading } = useTournament();

  // TODO: Fetch games only for selected group
  const {
    games,
    groups,
    isLoading,
    gamesScores,
    handleScoreSave,
    handleScoreChange,
  } = useTournamentGames();

  const { selectedValue, updateSelectedValue } = useSelectedValueQuery(
    "A",
    "group"
  );

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
              <p className="text-sm text-gray-500">
                {getGamesLeft(games, selectedValue)} games left
              </p>
            </div>
            <CircleProgress
              progress={
                getPercentagesOfFinishedGames(games, selectedValue).progress
              }
            />
          </div>

          <div className="mt-4 md:mt-0">
            <Tooltip
              isNowrap
              position="md:right-0 -top-10"
              content={
                tournament?.kind === "FREE"
                  ? "Share tournament is only available for pro tournaments"
                  : "Share tournament QR code."
              }
            >
              <SmallButton
                color="dark"
                icon={<IoQrCodeOutline className="h-6 w-6" />}
                handleClick={() => {
                  setIsQRModal((state) => !state);
                }}
              />
            </Tooltip>
          </div>
        </div>
      )}

      <DisplayGroupSelect
        groups={groups}
        selectedGroup={selectedValue}
        setSelectedGroup={updateSelectedValue}
      />

      <DisplayGames
        gamesScores={gamesScores}
        isGamesLoading={isLoading}
        handleScoreSave={handleScoreSave}
        handleScoreChange={handleScoreChange}
        games={games?.filter((game) => game.group === selectedValue) || []}
      />

      <div className="mt-5">
        {tournament?.type === "king" ? (
          <PlayerTable selectedGroup={selectedValue} players={players || []} />
        ) : (
          <TeamTable selectedGroup={selectedValue} teams={teams || []} />
        )}
      </div>

      {isQRModal && (
        <QRModal
          isQRModal={isQRModal}
          handleCancelClicks={() => {
            setIsQRModal((state) => !state);
          }}
        />
      )}
    </>
  );
};

export default TournamentPage;
