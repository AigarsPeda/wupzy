import { type FC } from "react";

interface TeamNameProps {
  name: string;
}

const TeamName: FC<TeamNameProps> = ({ name }) => {
  return (
    <div className="col-span-5 text-center">
      <p className="truncate whitespace-nowrap font-primary text-lg font-medium tracking-wider text-gray-50">
        {name}
      </p>
    </div>
  );
};

export default TeamName;
