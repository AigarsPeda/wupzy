import { useEffect, useState, type FC } from "react";
import DisplaySetScore from "~/components/elements/DisplaySetScore/DisplaySetScore";
import PlayoffTeamScore from "~/components/elements/PlayoffTeamScore/PlayoffTeamScore";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import {
  PlayoffGameSchema,
  type PlayGameType,
  type PlayoffMapType,
} from "~/types/playoff.types";
import { api } from "~/utils/api";
import organizePlayoffGames from "~/utils/organizePlayoffGames";

interface PlayoffTournamentProps {
  tournamentId: string | undefined;
}

const PlayoffTournament: FC<PlayoffTournamentProps> = ({ tournamentId }) => {
  const [playoffTree, setPlayoffTree] = useState<PlayoffMapType>(new Map());
  const { data } = api.playoffs.getPlayoffGames.useQuery(
    { tournamentId: tournamentId || "" },
    { enabled: Boolean(tournamentId) }
  );
  const { mutate } = api.playoffs.updatePlayoffGame.useMutation();

  const updateTeamsScore = (teamId: string, score: number) => {
    const newPlayoffTree: [number, PlayGameType[]][] = [...playoffTree].map(
      ([key, value]) => {
        return [
          key,
          value.map((game) => {
            const newTeams = game.teams.map((team) => {
              if (team.id === teamId) {
                return {
                  ...team,
                  score,
                };
              }

              return team;
            });

            return {
              ...game,
              teams: newTeams,
            };
          }),
        ];
      }
    );

    setPlayoffTree(new Map(newPlayoffTree));
  };

  const savePlayoffGames = (gameId: string) => {
    // // find game by id
    // const round = [...playoffTree].find(([_key, value]) => {
    //   return value.find((game) => game.id === gameId);
    // });

    // const game = round?.[1].find((game) => game.id === gameId);

    const targetGame = [...playoffTree]
      .flatMap(([_key, value]) => value)
      .find((game) => game.id === gameId);

    if (!targetGame) {
      return;
    }

    mutate({
      playoffGame: targetGame,
      tournamentId: tournamentId || "",
    });
  };

  useEffect(() => {
    if (!data?.playoffGames) {
      return;
    }

    const validatedPlayoffGames = PlayoffGameSchema.array().parse(
      data?.playoffGames
    );

    setPlayoffTree(organizePlayoffGames(validatedPlayoffGames));
  }, [data]);

  return (
    <PlayoffsTree
      playoffTree={playoffTree}
      displayTeamsComponent={({
        team,
        isLast,
        isWinner,
        teamScore,
        isBothTeams,
      }) => {
        return (
          <PlayoffTeamScore
            team={team}
            isLast={isLast}
            isWinner={isWinner}
            teamScore={teamScore}
            isBothTeams={isBothTeams}
            updateTeamsScore={updateTeamsScore}
          />
        );
      }}
      gameOptions={({
        gameId,
        isWinner,
        gameSets,
        isBothTeams,
        teamOneName,
        teamTwoName,
      }) => {
        return (
          <>
            {isBothTeams && (
              <div className="mt-3">
                <DisplaySetScore
                  gameSets={gameSets}
                  teamOneName={teamOneName}
                  teamTwoName={teamTwoName}
                />
                {!isWinner && (
                  <div className="my-3 flex justify-end">
                    {/* <TextButton
                      title="Reset"
                      handleClick={() => {
                        console.log("Reset", gameId);
                      }}
                    /> */}
                    <div className="ml-3">
                      <SmallButton
                        title="Save"
                        color="dark"
                        handleClick={() => {
                          savePlayoffGames(gameId);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default PlayoffTournament;
