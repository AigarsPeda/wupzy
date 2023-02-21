import type { Team } from "@prisma/client";
import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import { useState } from "react";

interface EditTournamentProps {
  teams: Team[];
}

const EditTournament: FC<EditTournamentProps> = ({ teams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {console.log(teams)}
      <UnderLineButton
        btnTitle={<span className="px-3 text-base">Edit tournament</span>}
        onClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />
      <EditTournamentGroup
        teams={teams}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default EditTournament;
