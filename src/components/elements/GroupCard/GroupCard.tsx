import type { Team } from "@prisma/client";
import type { FC } from "react";

interface GroupCardProps {
  team: Team;
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
