import { type FC } from "react";
import SmallModalLayout from "~/components/layout/SmallModalLayout/SmallModalLayout";

const SignupLinkModal: FC = () => {
  return (
    <SmallModalLayout
      isModalVisible
      modalTitle="Login"
      handleCancelClick={() => {
        console.log("cancel");
      }}
    >
      Hey
    </SmallModalLayout>
  );
};

export default SignupLinkModal;
