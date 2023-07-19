import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type FC } from "react";
import DisplayScore from "~/components/elements/DisplayScore/DisplayScore";
import DisplaySetScore from "~/components/elements/DisplaySetScore/DisplaySetScore";
import GameOption from "~/components/elements/GameOption/GameOption";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import TeamName from "~/components/elements/TeamName/TeamName";
import useWindowSize from "~/hooks/useWindowSize";
import { type GameType } from "~/types/tournament.types";
import {
  type GamesScoresType,
  type HandleScoreChangTypeArgs,
  type HandleScoreSaveTypeArgs,
} from "~/types/utils.types";

interface DisplayGamesProps {
  games: GameType[];
  isGamesLoading: boolean;
  gamesScores: GamesScoresType[];
  handleScoreSave?: ({ game }: HandleScoreSaveTypeArgs) => void;
  handleScoreChange?: ({
    num,
    gameId,
    teamId,
  }: HandleScoreChangTypeArgs) => void;
}

const DisplayGames: FC<DisplayGamesProps> = ({
  games,
  gamesScores,
  isGamesLoading,
  handleScoreSave,
  handleScoreChange,
}) => {
  const [parent] = useAutoAnimate();
  const { windowSize } = useWindowSize();

  // calculate the width of the one game card based on the window size so that the last card is cut off
  const cardsWidth = (wind: number) => {
    if (wind > 1100) {
      return 25;
    }

    if (wind > 810) {
      return 35;
    }

    if (wind > 668) {
      return 50;
    }

    return 75;
  };

  return (
    <div
      ref={parent}
      className="mt-4 flex w-full space-x-3 overflow-x-auto px-[8%] pb-5 md:px-0"
    >
      {!isGamesLoading ? (
        games.map((game) => {
          const gameScore = gamesScores.find(
            (gameScore) => gameScore.gameId === game.id
          );

          const firstTeamName = game?.teamOne?.players
            .map((player) => player.name)
            .join(" ");

          const secondTeamName = game?.teamTwo?.players
            .map((player) => player.name)
            .join(" ");

          const isWinnerFound = Boolean(game.winnerId);

          return (
            <div key={game.id} className="relative">
              <div
                className="h-full rounded-md border border-gray-200 bg-white p-2 shadow shadow-gray-300"
                style={{ width: `${cardsWidth(windowSize.width)}vw` }}
              >
                <div className="flex justify-between">
                  <div className="flex space-x-1">
                    <p className="rounded-md px-1 py-0.5 font-primary text-xs font-normal capitalize text-pink-500">
                      Game {game?.order}
                    </p>
                    <p className="rounded-md p-1 py-0.5 font-primary text-xs font-normal capitalize text-pink-500">
                      Round {game?.round}
                    </p>
                  </div>
                  {handleScoreChange && <GameOption id={game.id} />}
                </div>
                <div className="mb-2 mt-4">
                  <div className="grid grid-cols-10">
                    <div className="col-span-4 text-center">
                      <TeamName name={game?.teamOne?.name || firstTeamName} />
                    </div>
                    <div className="col-span-2 text-center" />
                    <div className="col-span-4 text-center">
                      <TeamName name={game?.teamTwo?.name || secondTeamName} />
                    </div>
                  </div>
                </div>

                {isWinnerFound || !handleScoreChange ? (
                  <div className="mb-5 grid grid-cols-10">
                    <div className="col-span-4 text-center">
                      <DisplayScore
                        score={game.teamOneSetScore}
                        isWinner={game.teamOneId === game.winnerId}
                      />
                    </div>
                    <div className="col-span-2 text-center" />
                    <div className="col-span-4 text-center">
                      <DisplayScore
                        isTextLeft
                        score={game.teamTwoSetScore}
                        isWinner={game.teamTwoId === game.winnerId}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto mb-4 grid grid-cols-10">
                    <div className="col-span-4">
                      <NumberInput
                        isFullWidth
                        value={gameScore?.teamOneScore || 0}
                        onChange={(num) => {
                          handleScoreChange({
                            num,
                            gameId: game?.id,
                            teamId: game?.teamOne?.id,
                          });
                        }}
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-center text-center">
                      <p className="text-sm text-gray-800">vs</p>
                    </div>

                    <div className="col-span-4">
                      <NumberInput
                        isFullWidth
                        value={gameScore?.teamTwoScore || 0}
                        onChange={(num) => {
                          handleScoreChange({
                            num,
                            gameId: game?.id,
                            teamId: game?.teamTwo?.id,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}

                <DisplaySetScore
                  game={game}
                  teamOneName={game?.teamOne?.name || firstTeamName}
                  teamTwoName={game?.teamTwo?.name || secondTeamName}
                />

                {!isWinnerFound && handleScoreSave && (
                  <div className="absolute bottom-2 right-2 mt-2 flex min-h-[2.5rem] items-center justify-end">
                    <SecondaryButton
                      color="dark"
                      title="Save"
                      type="button"
                      isLoading={gameScore?.isSaving}
                      handleClick={() =>
                        handleScoreSave({
                          game,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <>
          {[...Array(2).keys()].map((_, index) => (
            <LoadingSkeleton key={index} classes="h-48 w-full" />
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayGames;
