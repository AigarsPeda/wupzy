import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";

interface AuthenticateUserProps {
  sessionData: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}

const AuthenticateUser: FC<AuthenticateUserProps> = ({
  status,
  sessionData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <div>
      <Button
        isLoading={isLoading}
        title={sessionData ? "Sign out" : "Sign in"}
        handleClick={
          sessionData
            ? () => {
                setIsLoading(true);
                void signOut({
                  callbackUrl: "/",
                });
              }
            : () => void signIn()
        }
      />
    </div>
  );
};

export default AuthenticateUser;
