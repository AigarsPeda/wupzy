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

const PlayoffTournamentModal = dynamic(
  () =>
    import(
      "~/components/elements/PlayoffTournamentModal/PlayoffTournamentModal"
    )
);

interface SettingsDrawerModalsProps {
  isEditModal: boolean;
  isSplitModal: boolean;
  isDeleteModal: boolean;
  isPlayOffModal: boolean;
  setIsEditModal: (value: boolean) => void;
  setIsSplitModal: (value: boolean) => void;
  setIsDeleteModal: (value: boolean) => void;
  setIsPlayOffModal: (value: boolean) => void;
}

const SettingsDrawerModals: FC<SettingsDrawerModalsProps> = ({
  isEditModal,
  isSplitModal,
  isDeleteModal,
  isPlayOffModal,
  setIsEditModal,
  setIsSplitModal,
  setIsDeleteModal,
  setIsPlayOffModal,
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
      {isPlayOffModal && (
        <PlayoffTournamentModal
          isPlayOffModal={isPlayOffModal}
          handleCancelClicks={() => {
            setIsPlayOffModal(false);
          }}
        />
      )}
    </>
  );
};

export default SettingsDrawerModals;
