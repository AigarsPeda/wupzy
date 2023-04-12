import getWinsPerTeam from "components/elements/GroupCard/utils/getWinsPerTeam";
import GroupCardDisplayAllGames from "components/elements/GroupCardDisplayAllGames/GroupCardDisplayAllGames";
import GroupCardGamesOfInterest from "components/elements/GroupCardGamesOfInterest/GroupCardGamesOfInterest";
import GroupParticipantCard from "components/elements/GroupParticipantCard/GroupParticipantCard";
import GroupTeamsCard from "components/elements/GroupTeamsCard/GroupTeamsCard";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { GamesOfInterestType, GamesType } from "types/game.types";
import { GameSets } from "types/game.types";
import type { ParticipantType } from "types/team.types";
import type { TournamentTypeType } from "types/tournament.types";
import { api } from "utils/api";

interface GroupCardProps {
  group: string;
  tournamentId: string;
  participants: ParticipantType[];
  tournamentKind: TournamentTypeType;
  gamesOfInterest: GamesOfInterestType;
  totalGames: {
    [key: string]: number;
  };
  refetchData: () => void;
}

const GroupCard: FC<GroupCardProps> = ({
  group,
  totalGames,
  refetchData,
  tournamentId,
  participants,
  tournamentKind,
  gamesOfInterest,
}) => {
  const [isDisplayAllGames, setIsDisplayAllGames] = useState(false);
  const [score, setScore] = useState({
    firstTeam: 0,
    secondTeam: 0,
  });

  const { data: teams, refetch: refetchTeams } =
    api.tournaments.getAllTournamentTeams.useQuery({
      group,
      tournamentId,
    });

  const { mutateAsync: updateGameScore } =
    api.tournaments.updateGameScore.useMutation({
      onSuccess: async () => {
        await refetchTeams();
        refetchData();

        setScore({
          firstTeam: 0,
          secondTeam: 0,
        });
      },
    });

  const handleScoreSave = async (
    game: GamesType,
    firstTeamIds: string[],
    secondTeamsIds: string[]
  ) => {
    let winnerTeamIds: string[] = [];
    const currentSet = game.gameSet;
    const nasserSetsToWin = game.tournament.setsInGame;

    const { firstTeamWins, secondTeamWins } = getWinsPerTeam(
      game,
      score.firstTeam,
      score.secondTeam
    );

    if (firstTeamWins === nasserSetsToWin) {
      winnerTeamIds = [...firstTeamIds];
    }

    if (secondTeamWins === nasserSetsToWin) {
      winnerTeamIds = [...secondTeamsIds];
    }

    const setResults = {
      ...GameSets.parse(game.gameSets),
      [currentSet.toString()]: {
        firstTeam: score.firstTeam,
        secondTeam: score.secondTeam,
      },
    };

    const updateGame = await updateGameScore({
      setResults,
      id: game.id,
      tournamentId,
      winnerTeamIds,
      team1Score: score.firstTeam,
      team2Score: score.secondTeam,
    });

    if (!updateGame) {
      console.error("error creating game");
      return;
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      await refetchTeams();
    };

    if (participants) {
      fetchTeams().catch(console.error);
    }
  }, [participants, refetchTeams]);

  return (
    <div className="space-x-2 md2:flex">
      <GroupCardGamesOfInterest
        group={group}
        totalGames={totalGames}
        tournamentKind={tournamentKind}
        firstTeamScore={score.firstTeam}
        gamesOfInterest={gamesOfInterest}
        secondTeamScore={score.secondTeam}
        handleDisplayAllClick={() => {
          setIsDisplayAllGames((state) => !state);
        }}
        handleScoreChange={(team, score) => {
          setScore((prev) => ({
            ...prev,
            [team]: score,
          }));
        }}
        handleScoreSave={(game, firstTeamIds, secondTeamIds) => {
          handleScoreSave(game, firstTeamIds, secondTeamIds).catch((err) => {
            console.error("error updating game score", err);
          });
        }}
      />

      <div className="mt-5 w-full md2:mt-10 ">
        {tournamentKind === "TEAMS" ? (
          <GroupTeamsCard teams={teams?.teams || []} />
        ) : (
          <GroupParticipantCard participants={participants} />
        )}
      </div>

      <GroupCardDisplayAllGames
        group={group}
        tournamentId={tournamentId}
        tournamentKind={tournamentKind}
        isDisplayAllGames={isDisplayAllGames}
        handleCancelClick={() => {
          setIsDisplayAllGames(false);
        }}
      />
    </div>
  );
};

export default GroupCard;
