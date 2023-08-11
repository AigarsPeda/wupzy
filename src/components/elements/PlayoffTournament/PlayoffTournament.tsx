import { type FC } from "react";
import { api } from "~/utils/api";

interface PlayoffTournamentProps {
  tournamentId: string | undefined;
}

const PlayoffTournament: FC<PlayoffTournamentProps> = ({ tournamentId }) => {
  const { data } = api.playoffs.getPlayoffGames.useQuery(
    { tournamentId: tournamentId || "" },
    { enabled: tournamentId !== undefined }
  );

  return (
    <div>
      <code>{JSON.stringify(data)}</code>
    </div>
  );
};

export default PlayoffTournament;
