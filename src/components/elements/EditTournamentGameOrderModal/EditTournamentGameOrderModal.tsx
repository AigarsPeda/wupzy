import type { FC } from "react";
import EditTournamentGameOrder from "../EditTournamentGameOrder/EditTournamentGameOrder";
import ModalWrap from "../ModalWrap/ModalWrap";

interface EditTournamentGameOrderModalProps {
  tournamentId: string;
  gameEditGroup: string;
  handleCancelClick: () => void;
}

const EditTournamentGameOrderModal: FC<EditTournamentGameOrderModalProps> = ({
  tournamentId,
  gameEditGroup,
  handleCancelClick,
}) => {
  return (
    <ModalWrap
      modalWidth="2xl"
      topPosition="top"
      handleCancelClick={handleCancelClick}
      isModalVisible={Boolean(gameEditGroup)}
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
