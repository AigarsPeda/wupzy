import type { Team } from "@prisma/client";
import EditTournamentGroup from "components/elements/EditTournamentGroup/EditTournamentGroup";
import type { TeamsByGroupType } from "components/elements/EditTournamentGroup/EditTournamentGroup.types";
import UnderLineButton from "components/elements/UnderLineButton/UnderLineButton";
import type { FC } from "react";

interface EditTournamentProps {
  teams: Team[];
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
