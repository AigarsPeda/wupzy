import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { type FC } from "react";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";

interface AuthenticateUserProps {
  sessionData: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}

const AuthenticateUser: FC<AuthenticateUserProps> = ({ sessionData }) => {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (status === "loading") {
  //     setIsLoading(true);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [status]);

  return (
    <div>
      <PrimaryButton
        isFullWidth
        color="light"
        handleClick={
          sessionData
            ? () => {
                // setIsLoading(true);
                void signOut({
                  callbackUrl: "/",
                });
              }
            : () =>
                void signIn(undefined, {
                  callbackUrl: "/tournaments",
                })
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </PrimaryButton>
    </div>
  );
};

export default AuthenticateUser;
