import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import DisplayCredits from "~/components/elements/DisplayCredits/DisplayCredits";
import Divider from "~/components/elements/Divider/Divider";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import QRCode from "~/components/elements/QRCode/QRCode";
import {
  SettingButton,
  SettingButtonContent,
} from "~/components/elements/SettingButton/SettingButton";
import {
  SETTING_OPTION,
  type CommandType,
} from "~/components/elements/SettingDropdown/SettingOptions";
import SettingsDrawerModals from "~/components/elements/SettingsDrawerModals/SettingsDrawerModals";
import useTournament from "~/hooks/useTournament";
import { type TournamentKindType } from "~/types/tournament.types";

const SettingDropdown = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isSplitModal, setIsSplitModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPlayOffModal, setIsPlayOffModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { tournament, sessionData, updateTournamentToPro } = useTournament();

  const isPro = tournament?.kind === "PRO";

  const handleSettingButtonClick = (command: CommandType) => {
    if (command === "DeleteTournament") {
      setIsDeleteModal(true);
      setIsDropdownOpen(false);
    }

    if (command === "EditTournament") {
      setIsEditModal(true);
      setIsDropdownOpen(false);
    }

    if (command === "DivideIntoGroups") {
      setIsSplitModal(true);
      setIsDropdownOpen(false);
    }

    if (command === "CreatePlayoffs") {
      setIsPlayOffModal(true);
      setIsDropdownOpen(false);
    }
  };

  const isDisabled = (isProOnly: boolean, kind: TournamentKindType) => {
    if (isProOnly) {
      return kind !== "PRO";
    }

    return false;
  };

  return (
    <>
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
            <span className="mr-3 max-w-[100px] truncate text-gray-900">
              Settings
            </span>
            <IoSettingsOutline className="h-6 w-6" />
          </button>
        }
        handleDropdownClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <div className="min-w-[21rem] p-4">
          {!isPro && (
            <>
              <DisplayCredits credits={sessionData?.user.credits} />
              <Divider />
            </>
          )}
          <div>
            <SettingButton
              handleClick={() => {
                if (!isPro) {
                  updateTournamentToPro();
                }
              }}
              isDisables={isPro}
            >
              <SettingButtonContent
                title={tournament?.kind === "FREE" ? "Free" : "Pro"}
                action={tournament?.kind === "FREE" ? "Upgrade" : ""}
              />
            </SettingButton>
          </div>

          {tournament?.shareLink && (
            <QRCode
              name={tournament?.name || ""}
              slug={tournament?.shareLink?.slug || ""}
            />
          )}

          {SETTING_OPTION.map((item) => (
            <div key={item.id} className="mt-2">
              <SettingButton
                handleClick={() => {
                  handleSettingButtonClick(item.command);
                }}
                isDisables={isDisabled(item.isProOnly, tournament?.kind)}
              >
                <SettingButtonContent
                  isDanger={item.isDanger}
                  title={
                    <>
                      {item.icon}
                      {item.title}
                    </>
                  }
                  action={item.action}
                />
              </SettingButton>
            </div>
          ))}
        </div>
      </Dropdown>
      <SettingsDrawerModals
        isEditModal={isEditModal}
        isSplitModal={isSplitModal}
        isDeleteModal={isDeleteModal}
        isPlayOffModal={isPlayOffModal}
        setIsEditModal={setIsEditModal}
        setIsSplitModal={setIsSplitModal}
        setIsDeleteModal={setIsDeleteModal}
        setIsPlayOffModal={setIsPlayOffModal}
      />
    </>
  );
};

export default SettingDropdown;
