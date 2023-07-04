import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState, type FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuSplitSquareHorizontal } from "react-icons/lu";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import classNames from "~/utils/classNames";

const SplitTournamentModal = dynamic(
  () =>
    import("~/components/elements/SplitTournamentModal/SplitTournamentModal")
);

const DeleteTournamentModal = dynamic(
  () =>
    import("~/components/elements/DeleteTournamentModal/DeleteTournamentModal")
);

const SettingsDrawer: FC = () => {
  const { data: sessionData } = useSession();
  const [isSplitModal, setIsSplitModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <>
      <TopDrawerLayout>
        <div
          className={classNames(
            "w-full bg-gray-800 px-4 pb-6 pt-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:pb-6 md:pt-4"
          )}
        >
          <div className="flex justify-end">
            {sessionData && (
              <p className="font-normal">
                Available credits:
                <span
                  className={classNames(
                    sessionData.user.credits >= 75 && "text-green-500",
                    sessionData.user.credits < 75 && "text-yellow-500",
                    sessionData.user.credits < 25 && "text-orange-500",
                    sessionData.user.credits === 0 && "text-red-500",
                    "ml-2 font-bold tracking-wider"
                  )}
                >
                  {sessionData?.user.credits}
                </span>
              </p>
            )}
          </div>
          <div className="mt-5 flex flex-wrap space-x-6">
            <SmallButton
              color="red"
              icon={<AiOutlineDelete className="mr-2 h-[1.4rem] w-[1.4rem]" />}
              title="Delete"
              handleClick={() => {
                setIsDeleteModal(true);
              }}
            />
            <SmallButton
              color="gray"
              icon={<LuSplitSquareHorizontal className="mr-2 h-6 w-6" />}
              title="Split"
              handleClick={() => {
                setIsSplitModal(true);
              }}
            />
          </div>
        </div>
      </TopDrawerLayout>
      {isDeleteModal && (
        <DeleteTournamentModal
          isDeleteModal={isDeleteModal}
          handleCancelClicks={() => {
            setIsDeleteModal(false);
          }}
        />
      )}
      {isSplitModal && (
        <SplitTournamentModal
          isSplitModal={isSplitModal}
          handleCancelClicks={() => {
            setIsSplitModal(false);
          }}
        />
      )}
    </>
  );
};

export default SettingsDrawer;
