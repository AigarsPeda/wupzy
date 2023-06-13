import { type FC } from "react";

interface TeamNameProps {
  name: string;
}

const TeamName: FC<TeamNameProps> = ({ name }) => {
  return (
    <div className="col-span-5 text-right">
      <p className="truncate whitespace-nowrap font-primary text-sm font-medium tracking-wider">
        {name}
      </p>
    </div>
  );
};

export default TeamName;
