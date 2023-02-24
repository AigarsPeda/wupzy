import type { FC } from "react";
import type { TeamType } from "types/team.types";

interface GroupCardProps {
  team: TeamType;
}

const GroupCard: FC<GroupCardProps> = ({ team }) => {
  return (
    <div className="my-2 flex justify-between border-b">
      <p>{team.name}</p>
      <p>{team.score}</p>
    </div>
  );
};

export default GroupCard;
