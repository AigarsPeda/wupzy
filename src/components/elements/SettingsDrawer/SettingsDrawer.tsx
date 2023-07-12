import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { QRCodeSVG } from "qrcode.react";
import { useState, type FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuSplitSquareHorizontal } from "react-icons/lu";
import ErrorMessage from "~/components/elements/ErrorMessage/ErrorMessage";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import { env } from "~/env.mjs";
import useTournament from "~/hooks/useTournament";
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
            "w-full bg-gray-800 px-4 pb-6 pt-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:pb-6 md:pt-4"
          )}
        >
          <div className="flex justify-end">
            {sessionData && tournament?.kind === "FREE" ? (
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
            ) : (
              <div className="flex space-x-3">
                <div>
                  <p>{`${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
                    tournament?.shareLink?.slug || ""
                  }`}</p>
                </div>
                <div className="rounded-md bg-white p-2">
                  <QRCodeSVG
                    value={`${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
                      tournament?.shareLink?.slug || ""
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 flex flex-wrap space-x-6">
            <SmallButton
              color="red"
              title="Delete"
              icon={<AiOutlineDelete className="mr-2 h-[1.4rem] w-[1.4rem]" />}
              handleClick={() => {
                setIsDeleteModal(true);
              }}
            />
            <Tooltip
              isNowrap
              content={
                tournament?.kind === "FREE"
                  ? "Splitting is only available for pro tournaments"
                  : "Divide participants into groups."
              }
            >
              <SmallButton
                color="gray"
                title="Split"
                isDisabled={tournament?.kind === "FREE"}
                icon={<LuSplitSquareHorizontal className="mr-2 h-6 w-6" />}
                handleClick={() => {
                  setIsSplitModal(true);
                }}
              />
            </Tooltip>
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
