import { type FC } from "react";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";

interface SplitTournamentModalProps {
  isSplitModal: boolean;
  handleCancelClicks: () => void;
}

const SplitTournamentModal: FC<SplitTournamentModalProps> = ({
  isSplitModal,
  handleCancelClicks,
}) => {
  return (
    <ModalLayout
      isFullScreen
      isModalVisible={isSplitModal}
      handleCancelClick={handleCancelClicks}
      header={
        <div className="mb-4">
          <h1 className="text-3xl">Split tournament</h1>
        </div>
      }
    >
      <div className="w-72 px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-8 mt-5 font-primary">
          Are you sure you want to split this tournament?{" "}
        </p>
      </div>
    </ModalLayout>
  );
};

export default SplitTournamentModal;
