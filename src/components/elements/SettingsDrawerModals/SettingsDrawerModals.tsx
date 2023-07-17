import dynamic from "next/dynamic";
import { type FC } from "react";

const SplitTournamentModal = dynamic(
  () =>
    import("~/components/elements/SplitTournamentModal/SplitTournamentModal")
);

const DeleteTournamentModal = dynamic(
  () =>
    import("~/components/elements/DeleteTournamentModal/DeleteTournamentModal")
);

const EditTournamentModal = dynamic(
  () => import("~/components/elements/EditTournamentModal/EditTournamentModal")
);

interface SettingsDrawerModalsProps {
  isEditModal: boolean;
  isSplitModal: boolean;
  isDeleteModal: boolean;
  setIsEditModal: (value: boolean) => void;
  setIsSplitModal: (value: boolean) => void;
  setIsDeleteModal: (value: boolean) => void;
}

const SettingsDrawerModals: FC<SettingsDrawerModalsProps> = ({
  isEditModal,
  isSplitModal,
  isDeleteModal,
  setIsEditModal,
  setIsSplitModal,
  setIsDeleteModal,
}) => {
  return (
    <>
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
      {isEditModal && (
        <EditTournamentModal
          isEditModal={isEditModal}
          handleCancelClicks={() => {
            setIsEditModal(false);
          }}
        />
      )}
    </>
  );
};

export default SettingsDrawerModals;
