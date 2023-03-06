import EditInput from "components/elements/EditInput/EditInput";
import SmallButton from "components/elements/SmallButton/SmallButton";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { api } from "utils/api";

interface EditTournamentNameProps {
  tournamentId: string;
}

const EditTournamentName: FC<EditTournamentNameProps> = ({ tournamentId }) => {
  const { mutateAsync } = api.tournaments.updateTournament.useMutation();
  const [newTournamentName, setNewTournamentName] = useState<string | null>(
    null
  );
  const { data: tournament, refetch } = api.tournaments.getTournament.useQuery({
    id: tournamentId,
  });

  const handleTournamentNameChange = async () => {
    if (!newTournamentName) return;

    await mutateAsync({
      id: tournamentId,
      name: newTournamentName,
    });

    await refetch();
  };

  useEffect(() => {
    if (!tournament) return;
    setNewTournamentName(tournament.tournament.name);
  }, [tournament]);

  return (
    <div className="flex">
      <EditInput
        className="p-2 text-xl"
        value={newTournamentName || tournament?.tournament.name || ""}
        handleChange={(e) => {
          setNewTournamentName(e.target.value);
        }}
      />
      {newTournamentName !== tournament?.tournament.name && (
        <SmallButton
          btnTitle={<FiSave className="h-6 w-6" />}
          btnClassNames="h-11 px-4"
          handleClick={() => {
            handleTournamentNameChange().catch((err) =>
              console.error("Error changing tournament name", err)
            );
          }}
        />
      )}
    </div>
  );
};

export default EditTournamentName;
