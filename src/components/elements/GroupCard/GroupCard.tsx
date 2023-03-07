import type { FC } from "react";
import type { TeamType } from "types/team.types";
import classNames from "utils/classNames";

interface GroupCardProps {
  group: string;
  teams: TeamType[];
}

const GroupCard: FC<GroupCardProps> = ({ teams, group }) => {
  return (
    <div className="grid min-h-[20rem] min-w-[20rem] grid-cols-1 content-start rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md">
      <div>
        <p className="mb-5 text-sm text-gray-400">
          <span className="mr-2 text-3xl font-bold text-gray-800">{group}</span>
          group
        </p>
      </div>
      {teams.map((team, i) => {
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
};

export default GroupCard;
