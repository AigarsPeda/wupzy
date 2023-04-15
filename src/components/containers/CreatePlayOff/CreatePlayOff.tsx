import RoundButton from "components/elements/RoundButton/RoundButton";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useState } from "react";
import Button from "components/elements/Button/Button";
import useRedirect from "hooks/useRedirect";

const CreatePlayOffModal = dynamic(
  () => import("components/elements/CreatePlayOffModal/CreatePlayOffModal")
);

interface CreatePlayOffProps {
  isPlayoff: boolean;
  tournamentId: string;
}

const CreatePlayOff: FC<CreatePlayOffProps> = ({ tournamentId, isPlayoff }) => {
  const { redirectToPath } = useRedirect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isPlayoff ? (
        <Button
          btnClass="mr-2"
          btnTitle="Playoff"
          onClick={() => {
            redirectToPath(`${tournamentId}/playoff/`);
          }}
        />
      ) : (
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
      )}

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
