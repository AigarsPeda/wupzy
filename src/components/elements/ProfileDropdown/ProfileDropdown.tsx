import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import Profile from "~/components/elements/Profile/Profile";
import Spinner from "~/components/elements/Spinner/Spinner";

const ProfileDropdown = () => {
  const { data: sessionData, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      {sessionData ? (
        <Dropdown
          top="2.2"
          width="auto"
          isDropdownOpen={isDropdownOpen}
          dropdownBtn={
            <button
              className="flex items-center justify-center text-sm"
              onClick={() => {
                setIsDropdownOpen((state) => !state);
              }}
            >
              <span className="mr-2 max-w-[100px] truncate">
                {sessionData?.user.name}
              </span>
              <span>
                <RiArrowUpSLine className="h-3 w-3" />
                <RiArrowUpSLine className="h-3 w-3 rotate-180" />
              </span>
            </button>
          }
          handleDropdownClose={() => {
            setIsDropdownOpen(false);
          }}
        >
          <div className="min-w-[18rem] p-4">
            <Profile />
          </div>
        </Dropdown>
      ) : (
        <PrimaryButton
          color="dark"
          isDisabled={status === "loading"}
          handleClick={() => void signIn()}
        >
          <span className="min-h-[19px] min-w-[50px]">
            {status === "loading" ? (
              <Spinner size="xs" color="light" />
            ) : (
              "Sign in"
            )}
          </span>
        </PrimaryButton>
      )}
    </div>
  );
};
RiArrowUpSLine;

export default ProfileDropdown;
