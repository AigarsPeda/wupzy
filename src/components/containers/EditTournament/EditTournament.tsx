import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";
import type { TeamsByGroupType, TeamType } from "types/team.types";

interface EditTournamentProps {
  teams: TeamType[];
  isModalOpen: boolean;
  handleModalClicks: (b: boolean) => void;
  handleUpdateTeam: (team: TeamsByGroupType) => Promise<void>;
}

const EditTournament: FC<EditTournamentProps> = ({
  teams,
  isModalOpen,
  handleUpdateTeam,
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
        handleUpdateTeam={handleUpdateTeam}
        handleCloseModal={() => {
          handleModalClicks(false);
        }}
      />
    </>
  );
};

export default EditTournament;
