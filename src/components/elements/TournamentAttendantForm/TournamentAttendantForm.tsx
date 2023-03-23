import AttendantForm from "components/elements/AttendantForm/AttendantForm";
import type { FC } from "react";

interface TournamentAttendantFormProps {
  isKing: boolean;
  attendants: string[];
  addNewAttendant: () => void;
  setAttendants: (value: string[]) => void;
}

const TournamentAttendantForm: FC<TournamentAttendantFormProps> = ({
  isKing,
  attendants,
  setAttendants,
  addNewAttendant,
}) => {
  return (
    <div className="mt-12">
      <AttendantForm
        attendants={attendants}
        setAttendants={setAttendants}
        addNewAttendant={addNewAttendant}
      />
    </div>
  );
};

export default TournamentAttendantForm;
