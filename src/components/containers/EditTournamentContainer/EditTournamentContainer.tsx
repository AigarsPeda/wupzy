import EditTournament from "components/elements/EditTournament/EditTournament";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import useParticipants from "hooks/useParticipants";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { api } from "utils/api";

interface EditTournamentContainerProps {
  tournamentId: string;
}

const EditTournamentContainer: FC<EditTournamentContainerProps> = ({
  tournamentId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllGamesEnded, setIsAllGamesEnded] = useState(false);
  const { refetchParticipants } = useParticipants(tournamentId);
  const { data: games } = api.tournaments.getAllTournamentGames.useQuery(
    { tournamentId },
    { refetchOnWindowFocus: !isModalOpen }
  );

  // const { data } = api.teamsTournaments.getBestTeams.useQuery({
  //   tournamentId,
  //   teamsPerGroup: 3,
  // });

  useEffect(() => {
    if (games) {
      const allGamesEnded = games.games.every((game) => game.winners.length);
      setIsAllGamesEnded(allGamesEnded);
    }
  }, [games]);

  return (
    <>
      {!isAllGamesEnded && (
        <UnderLineButton
          btnTitle={<span className="px-3 text-base">Edit tournament</span>}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
      )}
      <EditTournament
        isModalOpen={isModalOpen}
        handleCloseModal={() => {
          setIsModalOpen(false);
          refetchParticipants().catch((err) => console.error(err));
        }}
      />
    </>
  );
};

export default EditTournamentContainer;
