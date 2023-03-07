import EditInput from "components/elements/EditInput/EditInput";
import type { FC } from "react";

interface EditTournamentNameProps {
  newTournamentName: string | null;
  setNewTournamentName: (newName: string) => void;
}

const EditTournamentName: FC<EditTournamentNameProps> = ({
  newTournamentName,
  setNewTournamentName,
}) => {
  return (
    <div className="flex">
      <EditInput
        className="p-2 text-xl"
        value={newTournamentName || ""}
        handleChange={(e) => {
          setNewTournamentName(e.target.value);
        }}
      />
    </div>
  );
};

export default EditTournamentName;
