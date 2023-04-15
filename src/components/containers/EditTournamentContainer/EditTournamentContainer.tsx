import RoundButton from "components/elements/RoundButton/RoundButton";
import useParticipants from "hooks/useParticipants";
import useWindowSize from "hooks/useWindowSize";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { api } from "utils/api";

const EditTournament = dynamic(
  () => import("components/elements/EditTournament/EditTournament")
);

interface EditTournamentContainerProps {
  isPlayoff: boolean;
  tournamentId: string;
}

const EditTournamentContainer: FC<EditTournamentContainerProps> = ({
  isPlayoff,
  tournamentId,
}) => {
  const { windowSize } = useWindowSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllGamesEnded, setIsAllGamesEnded] = useState(false);
  const { refetchParticipants } = useParticipants(tournamentId);
  const { data: games, refetch: refetchGames } =
    api.tournaments.getAllTournamentGames.useQuery(
      { tournamentId },
      { refetchOnWindowFocus: !isModalOpen }
    );

  useEffect(() => {
    if (!isModalOpen) {
      refetchGames().catch((err) => console.error("Error fetching games", err));
    }
  }, [isModalOpen, refetchGames]);

  useEffect(() => {
    if (games) {
      // checks if all games have scores
      const allGamesEnded = games.games.every((game) => {
        if (game.team1Score !== null || game.team2Score !== null) {
          return true;
        }
        return false;
      });

      setIsAllGamesEnded(allGamesEnded);
    }
  }, [games]);

  return (
    <div>
      {!isAllGamesEnded && !isPlayoff && (
        <RoundButton
          textSize="sm"
          bgColor="gray"
          btnType="button"
          btnContentClassNames="mr-2"
          btnContent={windowSize.width >= 400 && "Edit"}
          icon={<IoSettingsOutline className="h-5 w-5" />}
          handleClick={() => {
            setIsModalOpen((state) => !state);
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
    </div>
  );
};

export default EditTournamentContainer;
