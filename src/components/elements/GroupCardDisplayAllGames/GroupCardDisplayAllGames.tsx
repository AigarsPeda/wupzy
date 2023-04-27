import DisplaySetScore from "components/elements/DisplaySetScore/DisplaySetScore";
import DisplayTeams from "components/elements/DisplayTeams/DisplayTeams";
import getWinsPerTeam from "components/elements/GroupCard/utils/getWinsPerTeam";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import Spinner from "components/elements/Spinner/Spinner";
import useWindowSize from "hooks/useWindowSize";
import type { FC } from "react";
import { GameSets } from "types/game.types";
import type { TournamentTypeType } from "types/tournament.types";
import { api } from "utils/api";
import classNames from "utils/classNames";

interface GroupCardDisplayAllGamesProps {
  group: string;
  tournamentId: string;
  isDisplayAllGames: boolean;
  handleCancelClick: () => void;
  tournamentKind: TournamentTypeType;
}

const GroupCardDisplayAllGames: FC<GroupCardDisplayAllGamesProps> = ({
  group,
  tournamentId,
  tournamentKind,
  isDisplayAllGames,
  handleCancelClick,
}) => {
  const { windowSize } = useWindowSize();
  const { data: games, isLoading } =
    api.tournaments.getAllTournamentGames.useQuery(
      { group, tournamentId },
      { enabled: isDisplayAllGames }
    );

  return (
    <ModalWrap
      modalWidth="2xl"
      isModalVisible={isDisplayAllGames}
      modalTitle={`Group ${group} games`}
      handleCancelClick={handleCancelClick}
    >
      {isLoading ? (
        <div className="relative h-40 w-full">
          <Spinner size="small" />
        </div>
      ) : (
        <ul
          className="overflow-y-auto"
          style={
            windowSize.width > 650
              ? { maxHeight: "calc(100vh - 12rem)" }
              : { maxHeight: "calc(100vh - 8.5rem)" }
          }
        >
          {games?.games.map((game, i) => {
            const gameOrder = i + 1;
            const gameCount = games?.games.length;
            const isDraw = game.team1Score === game.team2Score;

            const finishedGames = game.gameSets
              ? GameSets.parse(game.gameSets)
              : null;

            const { firstTeamWins, secondTeamWins } =
              getWinsPerTeam(finishedGames);

            const isFirstTeamWinner =
              (game.team1Score || 0) > (game.team2Score || 0);

            const isSecondTeamWinner =
              (game.team2Score || 0) > (game.team1Score || 0);

            return (
              <li
                key={game.id}
                className="mb-2 flex rounded-md bg-gray-100 px-2 py-2"
              >
                <div className="w-full md:flex">
                  <div className="flex w-full">
                    <div
                      className={classNames(
                        "mr-2 w-[3rem] border-b-2 md:mr-3 md:w-[5rem] md:border-b-0 md:border-r-2 md:px-2"
                      )}
                    >
                      <p className="pb-1 text-xs">{`${gameOrder} of ${gameCount}`}</p>
                    </div>

                    <div className="mr-2 w-[50%] truncate">
                      <DisplayTeams
                        team={game.team1.participants}
                        infoScore={firstTeamWins.toString()}
                        isWinner={isFirstTeamWinner && !isDraw}
                        teamName={
                          tournamentKind === "TEAMS"
                            ? game.team1.name
                            : undefined
                        }
                      />
                    </div>
                    <div className="w-[50%] truncate">
                      <DisplayTeams
                        team={game.team2.participants}
                        infoScore={secondTeamWins.toString()}
                        isWinner={isSecondTeamWinner && !isDraw}
                        teamName={
                          tournamentKind === "TEAMS"
                            ? game.team2.name
                            : undefined
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-full max-w-[5.5rem]">
                      <DisplaySetScore game={game} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </ModalWrap>
  );
};

export default GroupCardDisplayAllGames;
