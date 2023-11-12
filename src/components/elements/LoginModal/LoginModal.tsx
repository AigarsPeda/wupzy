import { signIn, useSession } from "next-auth/react";
import { type FC } from "react";
import Button from "~/components/elements/Button/Button";
import SmallModalLayout from "~/components/layout/SmallModalLayout/SmallModalLayout";
import useRedirect from "~/hooks/useRedirect";

const LoginModal: FC = () => {
  const { status } = useSession();
  const { redirectToPath } = useRedirect();

  return (
    <SmallModalLayout
      isModalVisible
      modalTitle="Login"
      handleCancelClick={() => {
        redirectToPath("/");
      }}
    >
      <div className="w-72 px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-8 mt-5 font-primary">
          You need to be logged in to access this page.
        </p>
        <div>
          <div className="grid-cols-2 gap-5 space-y-3 md:grid md:space-y-0">
            {status !== "loading" && (
              <Button
                color="light"
                title="Cancel"
                handleClick={() => redirectToPath("/")}
              />
            )}
            <Button
              title="Sign in"
              isLoading={status === "loading"}
              handleClick={() =>
                void signIn(undefined, {
                  callbackUrl: "/tournaments",
                })
              }
            />
          </div>
        </div>
      </div>
    </SmallModalLayout>
  );
};

export default LoginModal;
