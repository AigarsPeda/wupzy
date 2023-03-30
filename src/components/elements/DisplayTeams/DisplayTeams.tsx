import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "utils/classNames";

interface DisplayTeamsProps {
  teamName?: string;
  infoScore: number;
  isWinner?: boolean;
  teamsScore?: number;
  isCurrentGame?: boolean;
  team: ParticipantType[];
  handleScoreChange?: (n: number) => void;
}

const DisplayTeams: FC<DisplayTeamsProps> = ({
  team,
  teamName,
  isWinner,
  infoScore,
  teamsScore,
  isCurrentGame,
  handleScoreChange,
}) => {
  return (
    <div>
      {teamName && (
        <div>
          <p
            className={classNames(
              isCurrentGame ? "text-white" : "text-gray-800"
            )}
          >
            {teamName}
          </p>
        </div>
      )}
      <div
        className={classNames(
          isWinner ? "text-grey-900 font-bold" : "font-normal",
          "flex w-full items-center"
        )}
      >
        {team.map((t) => (
          <p key={t.id} className={classNames(teamName && "text-xs", "mr-2 ")}>
            {t.name}
          </p>
        ))}
      </div>

      {isCurrentGame && handleScoreChange && (
        <NumberInput value={teamsScore ?? 0} onChange={handleScoreChange} />
      )}
      {!isCurrentGame && <p className="text-gray-800">{infoScore}</p>}
    </div>
  );
};

export default DisplayTeams;
