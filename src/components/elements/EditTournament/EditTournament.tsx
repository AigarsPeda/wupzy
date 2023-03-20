import Button from "components/elements/Button/Button";
import EditTournamentGameOrder from "components/elements/EditTournamentGameOrder/EditTournamentGameOrder";
import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";

type ContentType = "EditTournamentGroup" | "EditGameOrder";

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
  const [contentType, setContentType] = useState<ContentType>(
    "EditTournamentGroup"
  );

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
      <div className="my-5 flex w-full items-center justify-center">
        <Button
          btnColor="outline"
          isDisabled={contentType === "EditTournamentGroup"}
          btnTitle={<span className="px-3 text-sm">Edit tournament group</span>}
          onClick={() => {
            setContentType("EditTournamentGroup");
          }}
        />

        <Button
          btnColor="outline"
          btnClass="ml-4"
          isDisabled={contentType === "EditGameOrder"}
          btnTitle={<span className="px-3 text-sm">Change game order</span>}
          onClick={() => {
            setContentType("EditGameOrder");
          }}
        />
      </div>

      {(() => {
        switch (contentType) {
          case "EditTournamentGroup":
            return <EditTournamentGroup tournamentId={tournamentId} />;

          case "EditGameOrder":
            return <EditTournamentGameOrder tournamentId={tournamentId} />;

          default:
            return <p>Error</p>;
        }
      })()}
    </ModalWrap>
  );
};

export default EditTournament;
