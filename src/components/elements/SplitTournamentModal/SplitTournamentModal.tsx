import { type FC } from "react";
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
      header={
        <div className="">
          <h1 className="text-3xl">Split {tournament?.name}</h1>
        </div>
      }
    >
      <div className="w-72 px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-8 mt-5 font-primary text-red-600">
          * Splitting the tournament in groups will result in a reset of all
          scores and matches.
        </p>
      </div>
      <div className="px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        {tournament?.type === "teams" ? <TeamsSplit /> : <div>King</div>}
      </div>
    </ModalLayout>
  );
};

export default SplitTournamentModal;
