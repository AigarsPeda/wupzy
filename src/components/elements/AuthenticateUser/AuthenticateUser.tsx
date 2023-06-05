import { signIn, signOut, useSession } from "next-auth/react";
import { type FC } from "react";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import { api } from "~/utils/api";

const AuthenticateUser: FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="">
      <PrimaryButton
        btnTitle={sessionData ? "Sign out" : "Sign in"}
        handleClick={sessionData ? () => void signOut() : () => void signIn()}
      />
    </div>
  );
};

export default AuthenticateUser;
