import { useEffect, useState, type FC } from "react";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SetSelect from "~/components/elements/SetSelect/SetSelect";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import usePlayers from "~/hooks/usePlayers";
import useTeams from "~/hooks/useTeams";
import useTournament from "~/hooks/useTournament";
import { type PlayerType, type TeamType } from "~/types/tournament.types";
import countDivisionsByTwo from "~/utils/countDivisionsByTwo";
import formatTeamsToPlayoffTree from "~/utils/formatTeamsToPlayoffTree";

export type SelectedProperties = Pick<PlayerType | TeamType, "id" | "name">;

interface PlayoffTournamentModalProps {
  isPlayOffModal: boolean;
  handleCancelClicks: () => void;
}

const PlayoffTournamentModal: FC<PlayoffTournamentModalProps> = ({
  isPlayOffModal,
  handleCancelClicks,
}) => {
  const { teams } = useTeams();
  const { players } = usePlayers();
  const { tournament } = useTournament();
  const [playoffRounds, setPlayoffRounds] = useState<number[]>([]);
  const [selectedRoundsCount, setSelectedRoundsCount] = useState(0);

  useEffect(() => {
    if (players) {
      const length = players.length;
      let rounds = countDivisionsByTwo(length);

      if (rounds % 2 !== 0) {
        rounds--;
      }

      const playoffRounds = Array.from({ length: rounds }, (_, i) => i + 1);

      setPlayoffRounds(playoffRounds);
      selectedRoundsCount === 0 && setSelectedRoundsCount(rounds);
    }
  }, [teams, players, selectedRoundsCount]);

  return (
    <ModalLayout
      isFullScreen
      bgColor="gray"
      isModalVisible={isPlayOffModal}
      handleCancelClick={handleCancelClicks}
      header={
        <h1 className="truncate text-3xl">Create {tournament?.name} PAYOFFS</h1>
      }
    >
      <div className="dots h-full w-full">
        <div className="flex px-3 py-2 pb-2 md:px-6 md:py-4">
          <SetSelect
            options={playoffRounds}
            selectedSetCount={selectedRoundsCount}
            handleSetSelect={setSelectedRoundsCount}
          />
        </div>

        {/* <line
              x1={cx}
              y1={cy + 15}
              x2={x + step - leftOffset / 2}
              y2={y + (depth + 1) * 50}
              stroke="black"
            /> */}
        <div className="flex h-[80%] w-full overflow-y-auto px-3 py-2 pb-2 md:justify-center  md:px-6 md:py-4">
          <PlayoffsTree
            playoffTree={formatTeamsToPlayoffTree(
              tournament?.type === "king" ? players : teams,
              selectedRoundsCount
            )}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default PlayoffTournamentModal;
