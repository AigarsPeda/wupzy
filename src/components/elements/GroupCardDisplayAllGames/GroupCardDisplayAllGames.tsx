import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { api } from "utils/api";
import classNames from "utils/classNames";

interface GroupCardDisplayAllGamesProps {
  group: string;
  tournamentId: string;
  isDisplayAllGames: boolean;
  handleCancelClick: () => void;
}

const GroupCardDisplayAllGames: FC<GroupCardDisplayAllGamesProps> = ({
  group,
  tournamentId,
  isDisplayAllGames,
  handleCancelClick,
}) => {
  const { windowSize } = useWindowSize();
  const { data: games } = api.tournaments.getTournamentGames.useQuery(
    { group, tournamentId },
    { enabled: isDisplayAllGames }
  );

  return (
    <>
      <ModalWrap
        modalWidth="2xl"
        topPosition="top"
        isModalVisible={isDisplayAllGames}
        modalTitle={`Group ${group} games`}
        handleCancelClick={handleCancelClick}
      >
        <ul
          className="overflow-y-auto"
          style={
            windowSize.width && windowSize.width > 650
              ? { maxHeight: "calc(100vh - 11rem)" }
              : { maxHeight: "calc(100vh - 14rem)" }
          }
        >
          {games?.games.map((game, i) => {
            const gameOrder = i + 1;
            const gameCount = games?.games.length;
            const isDraw = game.team1Score === game.team2Score;
            const isFirstTeamWinner = game.team1Score > game.team2Score;
            const isSecondTeamWinner = game.team2Score > game.team1Score;

            console.log(game);

            return (
              <li
                key={game.id}
                className="mb-2 flex rounded-md bg-gray-100 py-2 px-2"
              >
                <div
                  className={classNames(
                    "mb-3 w-20 border-b-2  md:mr-3 md:mb-0 md:border-b-0 md:border-r-2 md:px-2"
                  )}
                >
                  <p className="pb-1 text-xs">{`${gameOrder} of ${gameCount}`}</p>
                </div>
                <DisplayTeams
                  infoScore={game.team1Score}
                  team={game.team1.participants}
                  isWinner={isFirstTeamWinner && !isDraw}
                />
                <DisplayTeams
                  infoScore={game.team2Score}
                  team={game.team2.participants}
                  isWinner={isSecondTeamWinner && !isDraw}
                />
              </li>
            );
          })}
        </ul>
      </ModalWrap>
    </>
  );
};

export default GroupCardDisplayAllGames;
