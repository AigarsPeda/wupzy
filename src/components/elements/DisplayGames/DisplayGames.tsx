import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type FC } from "react";
import DisplayScore from "~/components/elements/DisplayScore/DisplayScore";
import DisplaySetScore from "~/components/elements/DisplaySetScore/DisplaySetScore";
import GameOption from "~/components/elements/GameOption/GameOption";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import SecondaryButton from "~/components/elements/SecondaryButton/SecondaryButton";
import TeamName from "~/components/elements/TeamName/TeamName";
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

  return (
    <div
      ref={parent}
      className="relative mt-4 flex w-full gap-3 overflow-x-auto pb-5 md:gap-10 md:px-0"
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
            <div
              key={game.id}
              className="relative z-0 mx-auto flex items-center justify-center rounded-xl border border-slate-200/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 shadow-lg shadow-slate-200"
            >
              <div className="mx-auto rounded-xl border border-white/25 bg-gray-200 bg-white/5 px-6 py-3 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform">
                <div className="w-[70vw] sm:w-[45vw] md:w-[24vw]">
                  <div className="flex justify-between">
                    <div className="flex gap-1">
                      <p className="rounded-md font-primary text-xs font-normal capitalize text-gray-900">
                        Game {game?.order}
                      </p>
                      <p className="rounded-md font-primary text-xs font-normal capitalize text-gray-900">
                        Round {game?.round}
                      </p>
                    </div>
                    {handleScoreChange && <GameOption id={game.id} />}
                  </div>
                  <div className="mb-2 mt-0.5">
                    <div className="grid grid-cols-10">
                      <div className="col-span-4 mt-2">
                        <TeamName
                          isLeftText
                          name={game?.teamOne?.name || firstTeamName}
                        />
                      </div>
                      <div className="col-span-2 text-center" />
                      <div className="col-span-4 mt-2">
                        <TeamName
                          name={game?.teamTwo?.name || secondTeamName}
                        />
                      </div>
                    </div>
                    <div className="my-1 h-0.5 rounded-full bg-gradient-to-l from-orange-50 via-orange-600 to-orange-50" />
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
                    <div className="mx-auto mb-3 grid grid-cols-10">
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
                        <p className="text-sm text-gray-800"></p>
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
                    gameSets={game.gameSets}
                    teamOneName={game?.teamOne?.name || firstTeamName}
                    teamTwoName={game?.teamTwo?.name || secondTeamName}
                  />

                  {!isWinnerFound && handleScoreSave && (
                    <div className="absolute bottom-2 right-6 mt-2 flex min-h-[2.5rem] items-center justify-end">
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
