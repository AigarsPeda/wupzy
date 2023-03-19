import NumberInput from "components/elements/NumberInput/NumberInput";
import type { FC } from "react";
import type { ParticipantType } from "types/team.types";
import classNames from "utils/classNames";

interface DisplayTeamsProps {
  infoScore: number;
  isWinner?: boolean;
  teamsScore?: number;
  isCurrentGame?: boolean;
  team: ParticipantType[];
  handleScoreChange?: (n: number) => void;
}

const DisplayTeams: FC<DisplayTeamsProps> = ({
  team,
  isWinner,
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
      <div
        className={classNames(
          isWinner ? "text-grey-900 font-bold" : "font-normal",
          "flex w-full items-center"
        )}
      >
        {team.map((t) => (
          <p key={t.id} className={classNames("mr-2")}>
            {t.name}
          </p>
        ))}
      </div>

      {isCurrentGame && handleScoreChange && (
        <NumberInput value={teamsScore ?? 0} onChange={handleScoreChange} />
      )}
      {!isCurrentGame && <p className="text-gray-600">{infoScore}</p>}
    </div>
  );
};

export default DisplayTeams;
