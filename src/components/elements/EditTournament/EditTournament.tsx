import Button from "components/elements/Button/Button";
import EditTournamentGameOrder from "components/elements/EditTournamentGameOrder/EditTournamentGameOrder";
import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

// type ContentType = "EditTournamentGroup" | "EditGameOrder";

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
  const [gameEditGroup, setGameEditGroup] = useState("");

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
      {gameEditGroup !== "" ? (
        <>
          <EditTournamentGameOrder
            group={gameEditGroup}
            tournamentId={tournamentId}
          />
          <Button
            btnSize="square"
            btnColor="outline"
            btnTitle={<IoIosArrowBack className="h-6 w-6" />}
            onClick={() => {
              setGameEditGroup("");
            }}
          />
        </>
      ) : (
        <EditTournamentGroup
          tournamentId={tournamentId}
          handleEditGroupGame={setGameEditGroup}
        />
      )}
    </ModalWrap>
  );
};

export default EditTournament;
