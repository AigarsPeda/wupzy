import { type FC } from "react";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";

interface EditTournamentModalModalProps {
  isEditModal: boolean;
  handleCancelClicks: () => void;
}

const EditTournamentModal: FC<EditTournamentModalModalProps> = ({
  isEditModal,
  handleCancelClicks,
}) => {
  return (
    <ModalLayout
      isFullScreen
      isModalVisible={isEditModal}
      handleCancelClick={handleCancelClicks}
      header={
        <div className="">
          {/* <h1 className="text-3xl">Split {tournament?.name}</h1> */}
          <h1 className="text-3xl">Edit</h1>
        </div>
      }
    >
      <div className="px-3 pb-2 text-left md:px-6 md:pb-4">
        {/* {tournament?.type === "teams" ? (
          <TeamsSplit handleModalClose={handleCancelClicks} />
        ) : (
          <PlayerSplit handleModalClose={handleCancelClicks} />
        )} */}
      </div>
    </ModalLayout>
  );
};

export default EditTournamentModal;
