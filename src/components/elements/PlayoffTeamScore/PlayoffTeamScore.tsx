import { type FC } from "react";
import NumberInput from "~/components/elements/NumberInput/NumberInput";
import { type PlayOffTeamType } from "~/types/playoff.types";
import classNames from "~/utils/classNames";

export interface PlayoffTeamScoreProps {
  isLast: boolean;
  team: PlayOffTeamType;
  updateTeamsScore: (teamId: string, score: number) => void;
}

const PlayoffTeamScore: FC<PlayoffTeamScoreProps> = ({
  team,
  isLast,
  updateTeamsScore,
}) => {
  return (
    <div>
      <div
        className={classNames(
          !isLast && "mb-2",
          "flex items-center justify-between rounded bg-gray-200 px-2 py-2"
        )}
      >
        <p className="min-h-[1.2rem] min-w-[5rem]">{team?.name || ""}</p>
        <NumberInput
          isBorder
          value={team.score}
          onChange={(num) => {
            updateTeamsScore(team.id, num);
          }}
        />
      </div>
    </div>
  );
};

export default PlayoffTeamScore;
