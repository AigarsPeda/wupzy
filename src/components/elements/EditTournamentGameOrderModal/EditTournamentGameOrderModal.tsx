import EditTournamentGameOrder from "components/elements/EditTournamentGameOrder/EditTournamentGameOrder";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";

interface EditTournamentGameOrderModalProps {
  tournamentId: string;
  gameEditGroup: string;
  isGameOrderModalOpen: boolean;
  handleCancelClick: () => void;
}

const EditTournamentGameOrderModal: FC<EditTournamentGameOrderModalProps> = ({
  tournamentId,
  gameEditGroup,
  handleCancelClick,
  isGameOrderModalOpen,
}) => {
  return (
    <ModalWrap
      modalWidth="2xl"
      topPosition="top"
      handleCancelClick={handleCancelClick}
      isModalVisible={isGameOrderModalOpen}
      modalTitle={`Edit ${gameEditGroup} group games`}
    >
      <EditTournamentGameOrder
        group={gameEditGroup}
        tournamentId={tournamentId}
        handleCancelClick={handleCancelClick}
      />
    </ModalWrap>
  );
};

export default EditTournamentGameOrderModal;
