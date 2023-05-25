import Button from "components/elements/Button/Button";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { api } from "utils/api";

interface CancelSubscriptionModalProps {
  isModalVisible: boolean;
  handleModalClose: () => void;
}

const CancelSubscriptionModal: FC<CancelSubscriptionModalProps> = ({
  isModalVisible,
  handleModalClose,
}) => {
  const { mutate: cancelSubscription } =
    api.stripe.cancelSubscription.useMutation({
      onSuccess() {
        handleModalClose();
      },
    });

  return (
    <ModalWrap
      isModalVisible={isModalVisible}
      modalTitle="Cancel subscription"
      handleCancelClick={handleModalClose}
    >
      <div className="w-full">
        <p className="">Are you sure you want to cancel your subscription?</p>
        <div className="mt-4 flex justify-center">
          <Button
            btnColor="red"
            btnClass="mr-2"
            btnTitle="Cancel"
            onClick={cancelSubscription}
          />
          <Button btnClass="ml-2" btnTitle="Close" onClick={handleModalClose} />
        </div>
      </div>
    </ModalWrap>
  );
};

export default CancelSubscriptionModal;
