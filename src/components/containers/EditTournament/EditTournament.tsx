import ModalWrap from "components/elements/Modal/Modal";
import type { FC } from "react";
import { useState } from "react";
import Button from "../../elements/Button/Button";
import UnderLineButton from "../../elements/UnderLineButton/UnderLineButton";

const EditTournament: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UnderLineButton
        btnTitle={<span className="px-3 text-base">Edit tournament</span>}
        onClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />
      <ModalWrap
        modalWidth="xl"
        isModalVisible={isModalOpen}
        modalTitle="Crete new tournament"
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
      >
        <div>Edit Tournament</div>
      </ModalWrap>
    </>
  );
};

export default EditTournament;
