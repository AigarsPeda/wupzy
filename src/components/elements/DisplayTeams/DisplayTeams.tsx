import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import NumberInput from "../NumberInput/NumberInput";

interface DisplayTeamsProps {
  infoScore: number;
  teamsScore: number;
  isCurrentGame: boolean;
  team: ParticipantType[];
  handleScoreChange: (n: number) => void;
}

const DisplayTeams: FC<DisplayTeamsProps> = ({
  team,
  infoScore,
  teamsScore,
  isCurrentGame,
  handleScoreChange,
}) => {
  return (
    <div>
      <div>
        <p className="text-xs text-gray-400">First team</p>
      </div>
      <div className="flex w-full items-center">
        {team?.map((t) => (
          <p key={t.id} className="mr-2">
            {t.name}
          </p>
        ))}
      </div>
      {isCurrentGame && (
        <NumberInput value={teamsScore} onChange={handleScoreChange} />
      )}
      {!isCurrentGame && <p className="text-gray-600">{infoScore}</p>}
    </div>
  );
};

export default DisplayTeams;
