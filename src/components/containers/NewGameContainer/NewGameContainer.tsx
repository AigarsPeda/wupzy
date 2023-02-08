import ModalWrap from "components/elements/Modal/Modal";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";

const NewGameContainer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <RoundButton
        btnType="button"
        bgColor="outline"
        btnContent={
          <span className="flex items-center px-2 text-sm font-bold tracking-wide text-gray-800">
            New Game
          </span>
        }
        handleClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />
      <ModalWrap
        modalTitle=""
        isModalVisible={isModalOpen}
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
      >
        <h1>Modal open</h1>
      </ModalWrap>
    </>
  );
};

export default NewGameContainer;
