import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { FC } from "react";
import type { TeamType } from "types/team.types";
import classNames from "utils/classNames";
import sortTeams from "utils/sortTeams";

interface GroupTeamsCardProps {
  teams: TeamType[];
}

const GroupTeamsCard: FC<GroupTeamsCardProps> = ({ teams }) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 border-b px-2 pb-2">
        <div className="flex justify-start">
          <p className="text-sm">Teams</p>
        </div>
        <div className="flex justify-center">
          <p className="text-sm">Small points</p>
        </div>
        <div className="flex justify-end">
          <p className="text-sm">Points</p>
        </div>
      </div>

      <ul ref={parent} className="w-full">
        {sortTeams(teams).map((team, i) => {
          const isFirstGroup = i === 0;
          return (
            <li
              key={`${i}${team.id}`}
              className={classNames(
                !isFirstGroup && "border-t-2",
                "grid grid-cols-3 gap-4 px-2 py-2"
              )}
            >
              <div className="flex justify-start">
                <div>
                  <p>{team.name}</p>
                  <div className="flex space-x-2">
                    {team.participants?.map((participant) => (
                      <p key={participant.id} className="text-sm text-gray-400">
                        {participant.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <p>{team.smallPoints}</p>
              </div>
              <div className="flex justify-end">
                <p>{team.points}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupTeamsCard;
