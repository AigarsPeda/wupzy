import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import { useState } from "react";

const EditTournamentContainer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UnderLineButton
        btnTitle={<span className="px-3 text-base">Edit tournament</span>}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
      <EditTournamentGroup
        isModalOpen={isModalOpen}
        handleCloseModal={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default EditTournamentContainer;
