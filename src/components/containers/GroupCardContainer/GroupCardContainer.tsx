import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import type { TeamType } from "types/team.types";
import classNames from "utils/classNames";
import sortTeamsByGroup from "utils/sortTeamsByGroup";

interface GroupCardContainerProps {
  teams: TeamType[];
}

const GroupCardContainer: FC<GroupCardContainerProps> = ({ teams }) => {
  const createAllPossiblePairsInGroup = (teams: TeamType[]) => {
    const sorted = sortTeamsByGroup(teams);

    const allPossiblePairs: TeamType[][] = [];

    const pairs = new Map<string, TeamType[][]>([]);

    sorted.forEach((teams, group) => {
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const player1 = teams[i];
          const player2 = teams[j];
          if (!player1 || !player2) return;

          allPossiblePairs.push([player1, player2]);
        }
      }

      pairs.set(group, allPossiblePairs);
    });

    return pairs;
  };

  return (
    <div>
      <GridLayout minWith="320" isGap>
        {[...sortTeamsByGroup(teams)].map(([group, value]) => {
          return (
            <div
              key={group}
              className="grid min-h-[20rem] min-w-[20rem] grid-cols-1 content-start rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
            >
              <div>
                <p className="mb-5 text-sm text-gray-400">Group - {group}</p>
              </div>
              {value.map((team, i) => {
                const isFirstGroup = i === 0;
                return (
                  <div
                    key={`${i}${team.id}`}
                    className={classNames(
                      !isFirstGroup && "border-t-2",
                      "flex items-center justify-between py-2"
                    )}
                  >
                    <p>{team.name}</p>
                    <p>{team.score}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default GroupCardContainer;
