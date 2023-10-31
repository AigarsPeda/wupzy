import { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlinePartition,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsLayoutSplit } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import DisplayCredits from "~/components/elements/DisplayCredits/DisplayCredits";
import Divider from "~/components/elements/Divider/Divider";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import {
  SettingButton,
  SettingButtonContent,
} from "~/components/elements/SettingButton/SettingButton";
import SettingsDrawerModals from "~/components/elements/SettingsDrawerModals/SettingsDrawerModals";
import useTournament from "~/hooks/useTournament";

const SettingDropdown = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isSplitModal, setIsSplitModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPlayOffModal, setIsPlayOffModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { tournament, sessionData, isUpdatingToPro, updateTournamentToPro } =
    useTournament();

  const isPro = tournament?.kind === "PRO";

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
        <div className="min-w-[21rem] p-4">
          {!isPro && (
            <>
              <DisplayCredits credits={sessionData?.user.credits} />
              <Divider />
            </>
          )}
          <p className="text-xs text-gray-500">Kind:</p>
          <div className="pt-2">
            <SettingButton
              handleClick={() => {
                if (isUpdatingToPro) return;
                updateTournamentToPro();
              }}
              isDisables={isPro}
            >
              <SettingButtonContent
                title={isPro ? "Pro" : "Free"}
                action={
                  !isPro ? (isUpdatingToPro ? "Updating..." : "Change") : ""
                }
              />
            </SettingButton>
          </div>
          <Divider />
          <p className="text-xs text-gray-500">Edit:</p>
          <div className="pt-2">
            <SettingButton
              handleClick={() => {
                setIsEditModal(true);
                setIsDropdownOpen(false);
              }}
            >
              <SettingButtonContent
                action="Edit"
                title={
                  <>
                    <AiOutlinePlus className="mr-2 h-5" />
                    Add / Remove participant
                  </>
                }
              />
            </SettingButton>
          </div>
          <div className="pt-2">
            <SettingButton
              handleClick={() => {
                setIsSplitModal(true);
                setIsDropdownOpen(false);
              }}
            >
              <SettingButtonContent
                action="Edit"
                title={
                  <>
                    <BsLayoutSplit className="mr-2 h-4 " />
                    Dividing it into groups
                  </>
                }
              />
            </SettingButton>
          </div>

          {tournament?.type === "teams" && (
            <div className="pt-2">
              <SettingButton
                handleClick={() => {
                  setIsPlayOffModal(true);
                  setIsDropdownOpen(false);
                }}
              >
                <SettingButtonContent
                  action="Edit"
                  title={
                    <>
                      <AiOutlinePartition className="mr-2 h-5" />
                      Create playoffs
                    </>
                  }
                />
              </SettingButton>
            </div>
          )}
          <Divider />
          <p className="text-xs text-gray-500">Delete:</p>
          <div className="pt-2">
            <SettingButton
              handleClick={() => {
                setIsDeleteModal(true);
                setIsDropdownOpen(false);
              }}
            >
              <SettingButtonContent
                action="Delete"
                title={
                  <>
                    <AiOutlineDelete className="mr-2" />
                    Delete tournament
                  </>
                }
              />
            </SettingButton>
          </div>
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
