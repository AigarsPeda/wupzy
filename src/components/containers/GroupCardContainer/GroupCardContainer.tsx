import type { Team } from "@prisma/client";
import GroupCard from "components/elements/GroupCard/GroupCard";
import type { FC } from "react";

interface GroupCardContainerProps {
  teams: Team[];
}

const GroupCardContainer: FC<GroupCardContainerProps> = ({ teams }) => {
  return (
    <div className="max-w-[16rem] rounded border-gray-100 bg-gray-100 p-4 shadow-lg">
      <p className="mb-3 text-sm text-gray-400">Group - {teams[0]?.group}</p>
      {teams.map((team) => (
        <GroupCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default GroupCardContainer;
