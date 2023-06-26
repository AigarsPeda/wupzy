import { useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import DeleteTournamentModal from "~/components/elements/DeleteTournamentModal/DeleteTournamentModal";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import classNames from "~/utils/classNames";

const SettingsDrawer: FC = () => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <>
      <TopDrawerLayout>
        <div
          className={classNames(
            "w-full bg-gray-800 px-4 py-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:py-4"
          )}
        >
          <h1>Tournament setting</h1>
          <div className="mt-10">
            <div className="w-40">
              <Button
                size="sm"
                color="red"
                title="Delete tournament"
                handleClick={() => {
                  setIsDeleteModal(true);
                }}
              />
            </div>
          </div>
        </div>
      </TopDrawerLayout>
      <DeleteTournamentModal
        isDeleteModal={isDeleteModal}
        handleCancelClicks={() => {
          setIsDeleteModal(false);
        }}
      />
    </>
  );
};

export default SettingsDrawer;
