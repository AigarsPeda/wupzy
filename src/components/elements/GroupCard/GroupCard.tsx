import GroupCardDisplayAllGames from "components/elements/GroupCardDisplayAllGames/GroupCardDisplayAllGames";
import GroupCardGamesOfInterest from "components/elements/GroupCardGamesOfInterest/GroupCardGamesOfInterest";
import GroupParticipantCard from "components/elements/GroupParticipantCard/GroupParticipantCard";
import GroupTeamsCard from "components/elements/GroupTeamsCard/GroupTeamsCard";
import type { FC } from "react";
import { useState } from "react";
import type { GamesOfInterestType } from "types/game.types";
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
  refetchGames: () => void;
}

const GroupCard: FC<GroupCardProps> = ({
  group,
  totalGames,
  refetchGames,
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

  const { data, refetch: refetchTeams } =
    api.tournaments.getTournamentTeams.useQuery({
      group,
      tournamentId,
    });

  const { mutateAsync: updateGamScore } =
    api.tournaments.updateGamScore.useMutation({
      onSuccess: async () => {
        await refetchTeams();
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
        tournamentKind={tournamentKind}
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

      {tournamentKind === "TEAMS" ? (
        <GroupTeamsCard teams={data?.teams || []} />
      ) : (
        <GroupParticipantCard participants={participants} />
      )}

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
