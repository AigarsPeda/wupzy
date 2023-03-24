import KingAttendantForm from "components/elements/KingAttendantForm/KingAttendantForm";
import TeamsAttendantForm from "components/elements/TeamsAttendantForm/TeamsAttendantForm";
import type { FC } from "react";
import type {
  TeamsAttendantMapType,
  TeamsAttendantType,
} from "types/team.types";

interface TournamentAttendantFormProps {
  isKing: boolean;
  kingAttendants: string[];
  addNewAttendant: () => void;
  deleteTeam: (name: string) => void;
  teamsAttendants: TeamsAttendantMapType;
  setKingAttendants: (value: string[]) => void;
  createTeam: (name: string, participants: TeamsAttendantType[]) => void;
  handleTeamsAttendantsUpdate: (
    oldName: string,
    newName: string,
    participants: TeamsAttendantType[]
  ) => void;
}

const TournamentAttendantForm: FC<TournamentAttendantFormProps> = ({
  isKing,
  createTeam,
  deleteTeam,
  kingAttendants,
  teamsAttendants,
  addNewAttendant,
  setKingAttendants,
  handleTeamsAttendantsUpdate,
}) => {
  return (
    <div className="mt-12">
      {isKing ? (
        <KingAttendantForm
          kingAttendants={kingAttendants}
          addNewAttendant={addNewAttendant}
          setKingAttendants={setKingAttendants}
        />
      ) : (
        <TeamsAttendantForm
          createTeam={createTeam}
          deleteTeam={deleteTeam}
          teamsAttendants={teamsAttendants}
          handleTeamsAttendantsUpdate={handleTeamsAttendantsUpdate}
        />
      )}
    </div>
  );
};

export default TournamentAttendantForm;
