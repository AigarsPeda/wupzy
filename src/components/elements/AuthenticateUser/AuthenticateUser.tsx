import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { type FC } from "react";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";

interface AuthenticateUserProps {
  sessionData: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}

const AuthenticateUser: FC<AuthenticateUserProps> = ({
  status,
  sessionData,
}) => {
  // const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div>
      <PrimaryButton
        isLoading={status === "loading"}
        btnTitle={sessionData ? "Sign out" : "Sign in"}
        handleClick={sessionData ? () => void signOut() : () => void signIn()}
      />
    </div>
  );
};

export default AuthenticateUser;
