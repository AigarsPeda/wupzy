import EditTournament from "components/elements/EditTournament/EditTournament";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import { useState } from "react";
import { api } from "utils/api";

interface EditTournamentContainerProps {
  tournamentId: string;
}

const EditTournamentContainer: FC<EditTournamentContainerProps> = ({
  tournamentId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refetch: refetchGames } =
    api.tournaments.getAllTournamentGames.useQuery(
      { tournamentId },
      {
        refetchOnWindowFocus: !isModalOpen,
      }
    );

  return (
    <>
      <UnderLineButton
        btnTitle={<span className="px-3 text-base">Edit tournament</span>}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
      <EditTournament
        isModalOpen={isModalOpen}
        handleCloseModal={() => {
          setIsModalOpen(false);
          refetchGames().catch((err) => console.error(err));
        }}
      />
    </>
  );
};

export default EditTournamentContainer;
