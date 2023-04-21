import BuyProducts from "components/BuyProducts/BuyProducts";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";

const CreateAccount: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <RoundButton
        btnContent={<span className="px-3 py-1">Create account</span>}
        handleClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />

      <ModalWrap
        isModalVisible={isModalOpen}
        modalWidth="2xl"
        modalTitle="Choose a plan"
        handleCancelClick={() => setIsModalOpen(false)}
      >
        <div className="w-full">
          <BuyProducts />
        </div>
      </ModalWrap>
    </>
  );
};

export default CreateAccount;
