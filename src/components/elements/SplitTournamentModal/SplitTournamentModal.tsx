import { type FC } from "react";
import PlayerSplit from "~/components/elements/PlayerSplit/PlayerSplit";
import TeamsSplit from "~/components/elements/TeamsSplit/TeamsSplit";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import useTournament from "~/hooks/useTournament";

interface SplitTournamentModalProps {
  isSplitModal: boolean;
  handleCancelClicks: () => void;
}

const SplitTournamentModal: FC<SplitTournamentModalProps> = ({
  isSplitModal,
  handleCancelClicks,
}) => {
  const { tournament } = useTournament();

  return (
    <ModalLayout
      isFullScreen
      isModalVisible={isSplitModal}
      handleCancelClick={handleCancelClicks}
      header={<h1 className="truncate text-3xl">Split {tournament?.name}</h1>}
    >
      <div className="px-3 pb-2 text-left md:px-6 md:pb-4">
        {tournament?.type === "teams" ? (
          <TeamsSplit handleModalClose={handleCancelClicks} />
        ) : (
          <PlayerSplit handleModalClose={handleCancelClicks} />
        )}
      </div>
    </ModalLayout>
  );
};

export default SplitTournamentModal;
