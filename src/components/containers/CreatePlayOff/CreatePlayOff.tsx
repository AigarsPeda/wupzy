import RoundButton from "components/elements/RoundButton/RoundButton";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useState } from "react";

const CreatePlayOffModal = dynamic(
  () => import("components/elements/CreatePlayOffModal/CreatePlayOffModal")
);

interface CreatePlayOffProps {
  tournamentId: string;
}

const CreatePlayOff: FC<CreatePlayOffProps> = ({ tournamentId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <RoundButton
        textSize="sm"
        bgColor="gray"
        btnClass="mr-2"
        btnType="button"
        btnContentClassNames="px-4"
        btnContent="Create Playoffs"
        handleClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />

      <CreatePlayOffModal
        isModalOpen={isModalOpen}
        tournamentId={tournamentId}
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default CreatePlayOff;
