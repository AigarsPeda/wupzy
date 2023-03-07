import GroupCard from "components/elements/GroupCard/GroupCard";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import type { GameType, ParticipantsType } from "types/team.types";
import containsParticipants from "utils/containsParticipants";
import sortParticipantsByGroup from "utils/sortParticipantsByGroup";

interface GroupCardContainerProps {
  tournamentId: string;
}

const GroupCardContainer: FC<GroupCardContainerProps> = ({ tournamentId }) => {
  const { participants, isParticipantsLoading } = useParticipants(tournamentId);

  // TODO: Create all possible pairs in group and create games in backend?
  // const createAllPossiblePairsInGroup = (teams: TeamType[]) => {
  //   const sorted = sortTeamsByGroup(teams);
  //   const groupPairs = new Map<string, TeamType[][]>([]);

  //   for (const group of sorted.keys()) {
  //     const teams = sorted.get(group);

  //     if (!teams) return groupPairs;x

  //     const allPossiblePairs: TeamType[][] = [];

  //     for (let i = 0; i < teams.length; i++) {
  //       for (let j = i + 1; j < teams.length; j++) {
  //         const player1 = teams[i];
  //         const player2 = teams[j];

  //         if (!player1 || !player2) return groupPairs;

  //         allPossiblePairs.push([player1, player2]);
  //       }

  //       groupPairs.set(group, allPossiblePairs);
  //     }
  //   }

  //   return groupPairs;
  // };

  // const containsParticipants = (obj: TeamType, list: TeamType[]) => {
  //   for (let i = 0; i < list.length; i++) {
  //     if (list[i]?.id === obj.id) {
  //       return true;
  //     }
  //   }

  //   return false;
  // };

  // Create games of pairs
  const createGames = (pairs: Map<string, ParticipantsType[][]>) => {
    const games = new Map<string, GameType[]>([]);

    for (const group of pairs.keys()) {
      const teams = pairs.get(group);

      if (!teams) return games;

      const allPossiblePairs = teams;

      for (let i = 0; i < allPossiblePairs.length; i++) {
        const firstPair = allPossiblePairs[i];

        if (!firstPair) return games;

        for (let j = i + 1; j < allPossiblePairs.length; j++) {
          const secondPair = allPossiblePairs[j];

          if (!secondPair || !firstPair[0] || !firstPair[1]) return games;

          if (
            !containsParticipants(firstPair[0], secondPair) &&
            !containsParticipants(firstPair[1], secondPair)
          ) {
            const game: GameType = {
              first: firstPair,
              second: secondPair,
            };

            const test = games.get(group);

            if (test) {
              test.push(game);
              break;
            }

            games.set(group, [game]);
          }
        }
      }
    }

    console.log("games", games);

    // return games;
  };

  if (isParticipantsLoading) return <p>Loading...</p>;

  return (
    <div>
      {console.log("participants", participants)}
      <GridLayout minWith="320" isGap>
        {[...sortParticipantsByGroup(participants?.participants || [])].map(
          ([group, value]) => {
            return <GroupCard key={group} group={group} teams={value} />;
          }
        )}
      </GridLayout>
    </div>
  );
};

export default GroupCardContainer;
