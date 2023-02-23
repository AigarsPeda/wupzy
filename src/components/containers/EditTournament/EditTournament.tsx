import type { Team } from "@prisma/client";
import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";

interface EditTournamentProps {
  teams: Team[];
  isModalOpen: boolean;
  handleModalClicks: (b: boolean) => void;
}

const EditTournament: FC<EditTournamentProps> = ({
  teams,
  isModalOpen,
  handleModalClicks,
}) => {
  return (
    <>
      <UnderLineButton
        btnTitle={<span className="px-3 text-base">Edit tournament</span>}
        onClick={() => {
          handleModalClicks(!isModalOpen);
        }}
      />
      <EditTournamentGroup
        teams={teams}
        isModalOpen={isModalOpen}
        handleCloseModal={() => {
          handleModalClicks(false);
        }}
      />
    </>
  );
};

export default EditTournament;
