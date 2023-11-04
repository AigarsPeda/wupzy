import { type FC } from "react";
import Button from "~/components/elements/Button/Button";
import SmallModalLayout from "~/components/layout/SmallModalLayout/SmallModalLayout";
import useTournament from "~/hooks/useTournament";

interface DeleteTournamentModalProps {
  isDeleteModal: boolean;
  handleCancelClicks: () => void;
}

const DeleteTournamentModal: FC<DeleteTournamentModalProps> = ({
  isDeleteModal,
  handleCancelClicks,
}) => {
  const { deleteTournament } = useTournament();

  return (
    <SmallModalLayout
      isModalVisible={isDeleteModal}
      modalTitle="Delete tournament"
      handleCancelClick={handleCancelClicks}
    >
      <div className="w-72 px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-8 mt-5 font-primary">
          Are you sure you want to delete this tournament?{" "}
          <span className="font-medium">This action cannot be undone.</span>
        </p>
        <div>
          <div className="grid-cols-2 gap-5 space-y-3 md:grid md:space-y-0">
            <Button
              color="red"
              title="Delete"
              // isLoading={isDeleting}
              handleClick={deleteTournament}
            />
            <div className="w-full">
              {/* {!isDeleting && ( */}
              <Button
                color="light"
                title="Cancel"
                handleClick={handleCancelClicks}
              />
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </SmallModalLayout>
  );
};

export default DeleteTournamentModal;
