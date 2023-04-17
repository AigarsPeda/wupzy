import RoundButton from "components/elements/RoundButton/RoundButton";
import useRedirect from "hooks/useRedirect";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useState } from "react";
import type { TournamentTypeType } from "types/tournament.types";

const CreatePlayOffModal = dynamic(
  () => import("components/elements/CreatePlayOffModal/CreatePlayOffModal")
);

interface CreatePlayOffProps {
  isPlayoff: boolean;
  tournamentId: string;
  tournamentType: TournamentTypeType;
}

const CreatePlayOff: FC<CreatePlayOffProps> = ({
  tournamentId,
  isPlayoff,
  tournamentType,
}) => {
  const { redirectToPath } = useRedirect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {tournamentType === "TEAMS" && (
        <div>
          {isPlayoff ? (
            <RoundButton
              textSize="sm"
              btnType="button"
              btnContent="Playoff"
              btnContentClassNames="px-2"
              handleClick={() => {
                redirectToPath(`${tournamentId}/playoff/`);
              }}
            />
          ) : (
            <RoundButton
              textSize="sm"
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
      )}
    </>
  );
};

export default CreatePlayOff;
