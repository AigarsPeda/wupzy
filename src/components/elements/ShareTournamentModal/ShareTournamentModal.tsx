import { type FC } from "react";
import SmallModalLayout from "~/components/layout/SmallModalLayout/SmallModalLayout";

interface ShareTournamentModalProps {
  isShareModal: boolean;
  handleCancelClicks: () => void;
}

const ShareTournamentModal: FC<ShareTournamentModalProps> = ({
  isShareModal,
  handleCancelClicks,
}) => {
  return (
    <SmallModalLayout
      isModalVisible={isShareModal}
      modalTitle="Share tournament"
      handleCancelClick={handleCancelClicks}
    >
      <div className="w-72 px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-8 mt-5 font-primary">
          This is a link to your tournament. Share it with your participants.
        </p>
        <div>
          {/* <div className="grid-cols-2 gap-5 space-y-3 md:grid md:space-y-0">
          <Button
            color="red"
            title="Delete"
            isLoading={isDeleting}
            handleClick={deleteTournament}
          />
          <div className="w-full">
            {!isDeleting && (
              <Button
                color="light"
                title="Cancel"
                handleClick={handleCancelClicks}
              />
            )}
          </div>
        </div> */}
        </div>
      </div>
    </SmallModalLayout>
  );
};

export default ShareTournamentModal;
