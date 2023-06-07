import { type FC } from "react";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import useRedirect from "~/hooks/useRedirect";

const LoginModal: FC = () => {
  const { redirectToPath } = useRedirect();

  return (
    <ModalLayout
      isModalVisible
      handleCancelClick={() => {
        redirectToPath("/");
      }}
    >
      <h1>LoginModal</h1>
    </ModalLayout>
  );
};

export default LoginModal;
