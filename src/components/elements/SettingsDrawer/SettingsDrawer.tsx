import { useSession } from "next-auth/react";
import { useState, type FC } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePartition,
} from "react-icons/ai";
import { LuSplitSquareHorizontal } from "react-icons/lu";
import ErrorMessage from "~/components/elements/ErrorMessage/ErrorMessage";
import SettingsDrawerModals from "~/components/elements/SettingsDrawerModals/SettingsDrawerModals";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import useTournament from "~/hooks/useTournament";
import classNames from "~/utils/classNames";

const SettingsDrawer: FC = () => {
  const { data: sessionData } = useSession();
  const [isEditModal, setIsEditModal] = useState(false);
  const [isSplitModal, setIsSplitModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPlayOffModal, setIsPlayOffModal] = useState(false);

  const {
    tournament,
    isUpdatingKind,
    errorUpdatingKind,
    updateTournamentToPro,
  } = useTournament();

  return (
    <>
      <TopDrawerLayout>
        <div
          className={classNames(
            "w-screen bg-gray-800 px-4 pb-6 pt-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:pb-6 md:pt-4"
          )}
        >
          <div className="flex">
            {sessionData && tournament?.kind === "FREE" && (
              <div className="flex flex-col justify-end">
                <p className="mb-2 font-normal">
                  Available credits:
                  <span
                    className={classNames(
                      sessionData.user.credits >= 75 && "text-green-500",
                      sessionData.user.credits < 75 &&
                        sessionData.user.credits > 17 &&
                        "text-yellow-500",
                      sessionData.user.credits <= 17 && "text-red-500",
                      "ml-2 font-bold tracking-wider"
                    )}
                  >
                    {sessionData?.user.credits}
                  </span>
                </p>
                <SmallButton
                  color="gray"
                  title="Upgrade to Pro"
                  isDisabled={isUpdatingKind}
                  handleClick={updateTournamentToPro}
                />
                {errorUpdatingKind && (
                  <div className="mt-2">
                    <ErrorMessage message={errorUpdatingKind} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-5 space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <Tooltip
              isNowrap
              position="-top-10"
              content="Delete tournament and all its data."
            >
              <SmallButton
                isFullWidth
                color="red"
                title="Delete"
                iconMaxWidth="max-w-[7rem] w-full"
                icon={<AiOutlineDelete className="ml-3 h-6 w-6" />}
                handleClick={() => {
                  setIsDeleteModal((sate) => !sate);
                }}
              />
            </Tooltip>

            <Tooltip
              isNowrap
              position="-top-10"
              content="Edit tournament name, description, and more."
            >
              <SmallButton
                isFullWidth
                color="gray"
                title="Edit"
                iconMaxWidth="max-w-[7rem] w-full"
                icon={<AiOutlineEdit className="ml-4 h-6 w-6" />}
                handleClick={() => {
                  setIsEditModal((state) => !state);
                }}
              />
            </Tooltip>

            <Tooltip
              isNowrap
              position="-top-10"
              content={
                tournament?.kind === "FREE"
                  ? "Splitting is only available for pro tournaments"
                  : "Divide participants into groups."
              }
            >
              <SmallButton
                isFullWidth
                color="gray"
                title="Split"
                iconMaxWidth="max-w-[7rem] w-full"
                isDisabled={tournament?.kind === "FREE"}
                icon={<LuSplitSquareHorizontal className="ml-4 h-6 w-6" />}
                handleClick={() => {
                  setIsSplitModal((state) => !state);
                }}
              />
            </Tooltip>

            <Tooltip
              isNowrap
              position="-top-10"
              content={
                tournament?.kind === "FREE"
                  ? "Play offs is only available for pro tournaments"
                  : "Create play offs."
              }
            >
              <SmallButton
                isFullWidth
                color="gray"
                title="Play Offs"
                iconMaxWidth="max-w-[7rem] w-full"
                isDisabled={tournament?.kind === "FREE"}
                icon={<AiOutlinePartition className="ml-4 h-6 w-6" />}
                handleClick={() => {
                  setIsPlayOffModal((state) => !state);
                }}
              />
            </Tooltip>
          </div>
        </div>
      </TopDrawerLayout>

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

export default SettingsDrawer;
