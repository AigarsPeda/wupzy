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
  teamsAttendants: TeamsAttendantMapType;
  setKingAttendants: (value: string[]) => void;
  createTeam: (name: string, participants: TeamsAttendantType[]) => void;
}

const TournamentAttendantForm: FC<TournamentAttendantFormProps> = ({
  isKing,
  createTeam,
  kingAttendants,
  teamsAttendants,
  addNewAttendant,
  setKingAttendants,
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
          teamsAttendants={teamsAttendants}
        />
      )}
    </div>
  );
};

export default TournamentAttendantForm;
