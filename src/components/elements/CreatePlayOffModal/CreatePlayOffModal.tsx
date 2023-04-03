import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import InfoParagraph from "../InfoParagraph/InfoParagraph";

interface CreatePlayOffModalProps {
  isModalOpen: boolean;
  handleCancelClick: () => void;
}

const CreatePlayOffModal: FC<CreatePlayOffModalProps> = ({
  isModalOpen,
  handleCancelClick,
}) => {
  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
      <p>Create playoffs</p>
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
