import type { FC } from "react";
import { useState } from "react";
import { api } from "utils/api";
import type Stripe from "stripe";
import { useRouter } from "next/router";
import DisplayProducts from "../DisplayProducts/DisplayProducts";
import ModalWrap from "../ModalWrap/ModalWrap";
import RoundLinkButton from "../RoundLinkButton/RoundLinkButton";
import RoundButton from "../RoundButton/RoundButton";
import NewModalWrap from "../NewModalWrap/NewModalWrap";

const CreateAccount: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <RoundLinkButton href="/signup" linkTitle="Create account" /> */}
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
        // modalHeight="h-96"
        handleCancelClick={() => setIsModalOpen(false)}
      >
        <div className="w-full">
          <DisplayProducts />
        </div>
      </ModalWrap>
    </>
  );
};

export default CreateAccount;
