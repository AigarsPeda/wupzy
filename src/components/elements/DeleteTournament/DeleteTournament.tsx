import Button from "components/elements/Button/Button";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";

interface DeleteTournamentProps {
  isLoading: boolean;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteTournament: () => void;
}

const DeleteTournament: FC<DeleteTournamentProps> = ({
  isLoading,
  isModalOpen,
  handleCloseModal,
  handleDeleteTournament,
}) => {
  return (
    <ModalWrap
      modalWidth="xl"
      topPosition="top"
      modalHeight="h-60"
      isModalVisible={isModalOpen}
      modalTitle=" "
      handleCancelClick={handleCloseModal}
    >
      <div className="flex h-full w-full items-center justify-center text-center">
        <div className="mt-10">
          <h1 className="text-2xl">Do you really want to delete tournament?</h1>
          <div className="mt-8 flex items-center justify-center">
            <Button
              btnColor="red"
              btnTitle="Delete"
              isLoading={isLoading}
              onClick={handleDeleteTournament}
            />
            <Button
              btnClass="ml-4"
              btnTitle="Cancel"
              isLoading={isLoading}
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </div>
    </ModalWrap>
  );
};

export default DeleteTournament;
