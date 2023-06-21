import { type FC } from "react";
import ModalLayout from "~/components/elements/ModalLayout/ModalLayout";
import { type GameType } from "~/types/tournament.types";

interface EditGameProps {
  game: GameType | undefined;
  handleModalClose: () => void;
}

const EditGame: FC<EditGameProps> = ({ game, handleModalClose }) => {
  return (
    <ModalLayout
      isFullScreen
      modalTitle="Edit Game"
      isModalVisible={Boolean(game)}
      handleCancelClick={handleModalClose}
    >
      <div className="flex flex-col items-center justify-center">
        <p>Hei</p>
      </div>
    </ModalLayout>
  );
};

export default EditGame;
