import { signIn, useSession } from "next-auth/react";
import { type FC } from "react";
import Button from "~/components/elements/Button/Button";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import useRedirect from "~/hooks/useRedirect";

const LoginModal: FC = () => {
  const { status } = useSession();
  const { redirectToPath } = useRedirect();

  return (
    <ModalLayout
      isModalVisible
      modalTitle="Login"
      handleCancelClick={() => {
        redirectToPath("/");
      }}
    >
      <div className="w-full max-w-[28rem] px-3 pb-2 text-left md:px-6 md:pb-4">
        <p className="mb-5 font-primary">
          You need to be logged in to access this page.
        </p>
        <div className="flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center space-x-4">
            <Button
              title="Sign in"
              isLoading={status === "loading"}
              handleClick={() => void signIn()}
            />
            {status !== "loading" && (
              <Button
                color="light"
                title="Cancel"
                handleClick={() => redirectToPath("/")}
              />
            )}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default LoginModal;
