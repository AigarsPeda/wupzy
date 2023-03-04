import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";

interface EditTournamentProps {
  isModalOpen: boolean;
  handleModalClick: (b: boolean) => void;
}

const EditTournament: FC<EditTournamentProps> = ({
  isModalOpen,
  handleModalClick,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UnderLineButton
        btnTitle={<span className="px-3 text-base">Edit tournament</span>}
        onClick={() => {
          handleModalClick(!isModalOpen);
        }}
      />
      <EditTournamentGroup
        isModalOpen={isModalOpen}
        handleCloseModal={() => {
          handleModalClick(false);
        }}
      />
    </>
  );
};

export default EditTournament;
