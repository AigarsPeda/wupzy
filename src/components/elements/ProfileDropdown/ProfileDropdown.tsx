import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import MyImage from "~/components/elements/MyImage/MyImage";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import Profile from "~/components/elements/Profile/Profile";
import Spinner from "~/components/elements/Spinner/Spinner";

const ProfileDropdown = () => {
  const { data: sessionData, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div>
      {sessionData ? (
        <Dropdown
          top="3"
          width="auto"
          isDropdownOpen={isDropdownOpen}
          dropdownBtn={
            <button
              className="flex items-center justify-center text-sm"
              onClick={() => {
                setIsDropdownOpen((state) => !state);
              }}
            >
              {sessionData?.user.image ? (
                <div className="mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-300 shadow">
                  <MyImage
                    width={32}
                    height={32}
                    alt="profile"
                    src={sessionData?.user.image || ""}
                  />
                </div>
              ) : (
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 shadow">
                  <span className="text-xl text-white">
                    {getFirstLetter(sessionData?.user.name || "")}
                  </span>
                </div>
              )}

              {/* <span className="mr-2 max-w-[100px] truncate">
                {sessionData?.user.name}
              </span> */}
              <span>
                <RiArrowUpSLine className="h-4 w-4" />
                <RiArrowUpSLine className="h-4 w-4 rotate-180" />
              </span>
            </button>
          }
          handleDropdownClose={() => {
            setIsDropdownOpen(false);
          }}
        >
          <div className="min-w-[18rem] p-4">
            <Profile userId={sessionData.user.id} />
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

export default ProfileDropdown;
