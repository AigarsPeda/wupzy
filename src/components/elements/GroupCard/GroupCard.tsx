import GroupCardDisplayAllGames from "components/elements/GroupCardDisplayAllGames/GroupCardDisplayAllGames";
import GroupCardGamesOfInterest from "components/elements/GroupCardGamesOfInterest/GroupCardGamesOfInterest";
import GroupCardTeams from "components/elements/GroupCardTeams/GroupCardTeams";
import type { FC } from "react";
import { useState } from "react";
import type { GamesOfInterestType } from "types/game.types";
import type { ParticipantType } from "types/team.types";
import { api } from "utils/api";

interface GroupCardProps {
  group: string;
  tournamentId: string;
  teams: ParticipantType[];
  gamesOfInterest: GamesOfInterestType;
  totalGames: {
    [key: string]: number;
  };
  refetchGames: () => void;
}

const GroupCard: FC<GroupCardProps> = ({
  teams,
  group,
  totalGames,
  refetchGames,
  tournamentId,
  gamesOfInterest,
}) => {
  const [isDisplayAllGames, setIsDisplayAllGames] = useState(false);
  const [score, setScore] = useState({
    firstTeam: 0,
    secondTeam: 0,
  });
  const { mutateAsync: updateGamScore } =
    api.tournaments.updateGamScore.useMutation({
      onSuccess: () => {
        refetchGames();
        setScore({
          firstTeam: 0,
          secondTeam: 0,
        });
      },
    });

  const handleScoreSave = async (
    id: string,
    firstTeamIds: string[],
    secondTeamsIds: string[]
  ) => {
    const tournament = await updateGamScore({
      id,
      team1Score: score.firstTeam,
      team2Score: score.secondTeam,
      winnerTeamIds:
        score.firstTeam > score.secondTeam ? firstTeamIds : secondTeamsIds,
    });

    if (!tournament) {
      console.error("error creating tournament");
      return;
    }
  };

  return (
    <div className="mb-6 min-h-[20rem] min-w-[20rem] grid-cols-6 content-start gap-4 rounded-md border border-gray-50 bg-gray-50 py-3 shadow-md md:px-8 xl:grid">
      <GroupCardGamesOfInterest
        group={group}
        totalGames={totalGames}
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
        handleScoreSave={(gameId, firstTeamIds, secondTeamIds) => {
          handleScoreSave(gameId, firstTeamIds, secondTeamIds).catch((err) => {
            console.error("error updating game score", err);
          });
        }}
      />

      <GroupCardTeams teams={teams} />

      <GroupCardDisplayAllGames
        group={group}
        tournamentId={tournamentId}
        isDisplayAllGames={isDisplayAllGames}
        handleCancelClick={() => {
          setIsDisplayAllGames(false);
        }}
      />
    </div>
  );
};

export default GroupCard;
