import { type FC } from "react";
import DisplayScore from "~/components/elements/DisplayScore/DisplayScore";
import DisplaySetScore from "~/components/elements/DisplaySetScore/DisplaySetScore";
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
  handleScoreSave: ({ game }: HandleScoreSaveTypeArgs) => void;
  handleScoreChange: ({
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
  return (
    <div>
      <div className="mb-2 mt-4">
        <p className="font-primary text-xs text-gray-500">Games</p>
      </div>

      <div className="relative flex overflow-x-auto">
        <div className="ml-4 flex w-full space-x-3 overflow-x-auto pb-5 md:ml-0">
          {!isGamesLoading ? (
            games.map((game) => {
              const gameScore = gamesScores.find(
                (gameScore) => gameScore.gameId === game.id
              );

              const isWinnerFound = Boolean(game.winnerId);

              return (
                <div
                  key={game.id}
                  className="rounded-md border border-gray-300 bg-gradient-to-br from-gray-100 to-white p-3 shadow-sm"
                >
                  <div className="flex h-full w-72 flex-col justify-between">
                    <div className="mb-4 flex space-x-1">
                      <p className="rounded-md bg-gray-400 px-1 py-0.5 font-primary text-xs font-normal capitalize text-gray-50">
                        Game {game?.order}
                      </p>
                      <p className="rounded-md bg-gray-400 p-1 py-0.5 font-primary text-xs font-normal capitalize text-gray-50">
                        Round {game?.round}
                      </p>
                    </div>
                    <div className="mb-2">
                      <div className="grid grid-cols-12">
                        <TeamName name={game?.teamOne?.name} />
                        <div className="col-span-2 text-center">
                          <p className="content-center text-sm text-gray-300">
                            vs
                          </p>
                        </div>
                        <TeamName name={game?.teamTwo?.name} />
                      </div>

                      {isWinnerFound && (
                        <div className="flex justify-around">
                          <DisplayScore
                            score={game.teamOneSetScore}
                            isWinner={game.teamOneId === game.winnerId}
                          />
                          <DisplayScore
                            score={game.teamTwoSetScore}
                            isWinner={game.teamTwoId === game.winnerId}
                          />
                        </div>
                      )}
                    </div>
                    {!isWinnerFound && (
                      <div className="flex justify-between pb-4">
                        <NumberInput
                          value={gameScore?.teamOneScore || 0}
                          onChange={(num) => {
                            handleScoreChange({
                              num,
                              gameId: game?.id,
                              teamId: game?.teamOne?.id,
                            });
                          }}
                        />
                        <NumberInput
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
                    )}

                    <DisplaySetScore game={game} />

                    <div className="flex items-center justify-end">
                      {!isWinnerFound && (
                        <SecondaryButton
                          type="button"
                          color="dark"
                          title="Save"
                          isLoading={gameScore?.isSaving}
                          handleClick={() =>
                            handleScoreSave({
                              game,
                            })
                          }
                        />
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
        <div className="z-1 absolute left-1 top-0 h-full w-5 bg-gradient-to-r from-gray-50 to-transparent md:-left-2" />
        <div className="z-1 absolute right-0 top-0 h-full w-5 bg-gradient-to-r from-transparent to-gray-50 md:w-14" />
      </div>
    </div>
  );
};

export default DisplayGames;
