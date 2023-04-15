import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";

interface EditTournamentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const EditTournament: FC<EditTournamentProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const { query } = useRouter();
  const [tournamentId, setTournamentId] = useState("");

  useEffect(() => {
    if (!query.tournamentsId || typeof query.tournamentsId !== "string") return;

    setTournamentId(query.tournamentsId);
  }, [query.tournamentsId]);

  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Edit tournament groups"
      handleCancelClick={handleCloseModal}
    >
      <GridLayout minWith="250">
        <EditTournamentGroup tournamentId={tournamentId} />
      </GridLayout>
    </ModalWrap>
  );
};

export default EditTournament;
