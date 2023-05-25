import Button from "components/elements/Button/Button";
import useRedirect from "hooks/useRedirect";
import { api } from "utils/api";
import { eraseCookie } from "utils/cookie";

const LogoutButton = () => {
  const { redirectToPath } = useRedirect();
  const { mutate, isLoading } = api.users.logoutUser.useMutation();

  return (
    <Button
      type="button"
      btnSize="full"
      btnClass="hover:bg-red-500 py-3"
      btnTitle="Log out"
      isLoading={isLoading}
      onClick={() => {
        mutate();
        eraseCookie("token");
        redirectToPath("/login", window.location.pathname);
      }}
    />
  );
};

export default LogoutButton;
