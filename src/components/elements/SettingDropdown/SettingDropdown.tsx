import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import classNames from "~/utils/classNames";
import DisplayCredits from "~/components/elements/DisplayCredits/DisplayCredits";
import Divider from "../Divider/Divider";
import useTournament from "../../../hooks/useTournament";

const SettingDropdown = () => {
  const { data: sessionData } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    tournament,
    isUpdatingKind,
    isKingTournament,
    errorUpdatingKind,
    updateTournamentToPro,
  } = useTournament();

  return (
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
          <span className="mr-2 max-w-[100px] truncate text-gray-900">
            Settings
          </span>
          <IoSettingsOutline className="h-6 w-6" />
        </button>
      }
      handleDropdownClose={() => {
        setIsDropdownOpen(false);
      }}
    >
      <div className="min-w-[16rem] p-4">
        <DisplayCredits credits={sessionData?.user.credits} />
        <Divider />
        <p className="text-xs text-gray-500">Tournament kind:</p>
        <div className="flex items-center justify-between pt-2">
          <p className="">{isKingTournament ? "Pro" : "Free"}</p>
          <button
            className={classNames(
              "text-sm text-gray-500 transition-all hover:text-gray-900",
              isUpdatingKind && "cursor-not-allowed"
            )}
            onClick={() => {
              if (isUpdatingKind) return;
              updateTournamentToPro();
            }}
          >
            {isUpdatingKind ? "Updating..." : "Change"}
          </button>
        </div>
      </div>
    </Dropdown>
  );
};

export default SettingDropdown;
