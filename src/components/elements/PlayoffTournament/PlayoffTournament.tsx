import { useEffect, useState, type FC } from "react";
import DisplaySetScore from "~/components/elements/DisplaySetScore/DisplaySetScore";
import PlayoffTeamScore from "~/components/elements/PlayoffTeamScore/PlayoffTeamScore";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import { PlayoffGameSchema, type PlayoffMapType } from "~/types/playoff.types";
import { api } from "~/utils/api";
import organizePlayoffGames from "~/utils/organizePlayoffGames";

interface PlayoffTournamentProps {
  tournamentId: string | undefined;
}

const PlayoffTournament: FC<PlayoffTournamentProps> = ({ tournamentId }) => {
  const [clickedTeamsId, setClickedTeamsId] = useState("");
  const [playoffTree, setPlayoffTree] = useState<PlayoffMapType>(new Map());
  const { data, refetch } = api.playoffs.getPlayoffGames.useQuery(
    { tournamentId: tournamentId || "" },
    { enabled: Boolean(tournamentId) }
  );
  const { mutate } = api.playoffs.updatePlayoffGame.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const updateTeamsScore = (teamId: string, score: number) => {
    setPlayoffTree((prevPlayoffTree) => {
      const newPlayoffTree = new Map(prevPlayoffTree);

      newPlayoffTree.forEach((games) => {
        games.forEach((game) => {
          const newTeams = game.teams.map((team) => {
            if (team.id === teamId) {
              return {
                ...team,
                score,
              };
            }

            return team;
          });

          game.teams = newTeams;
        });
      });

      return newPlayoffTree;
    });
  };

  const savePlayoffGames = (gameId: string) => {
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
            clickedTeamsId={clickedTeamsId}
            updateTeamsScore={updateTeamsScore}
            setClickedTeamsId={setClickedTeamsId}
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
