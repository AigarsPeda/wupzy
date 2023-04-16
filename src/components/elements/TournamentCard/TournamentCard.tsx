import Button from "components/elements/Button/Button";
import useRedirect from "hooks/useRedirect";
import type { FC } from "react";
import type { TournamentType } from "types/tournament.types";
import formatDate from "utils/formatDate";
import TournamentCardOptionDropdown from "../TournamentCardOptionDropdown/TournamentCardOptionDropdown";

interface TournamentCardProps {
  isPlayoff: boolean;
  refetch: () => void;
  tournament: TournamentType;
}

const TournamentCard: FC<TournamentCardProps> = ({
  refetch,
  isPlayoff,
  tournament,
}) => {
  const { redirectToPath } = useRedirect();

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-100 p-4 text-left shadow-lg transition-all duration-200">
      <div className="mb-5 flex items-center">
        <p className="text-sm text-gray-400">{tournament.type}</p>
      </div>
      <div className="mb-4 flex flex-col space-y-3 border-b-2 pb-4">
        <div className="mb-2 flex flex-col">
          {/* <p className="text-sm text-gray-500">Name</p> */}
          <h3 className="text-xl font-semibold">{tournament.name}</h3>
        </div>
        <div>
          <p className="text-xs text-gray-400">Crated</p>
          <p className="text-sm">{formatDate(tournament.createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        {isPlayoff && (
          <Button
            btnTitle="Playoff"
            btnSize="xs"
            btnColor="outline"
            onClick={() => {
              redirectToPath(`tournaments/${tournament.id}/playoff/`);
            }}
          />
        )}
        <Button
          btnSize="xs"
          btnClass="ml-2"
          btnTitle="Enter"
          onClick={() => {
            redirectToPath(`/tournaments/${tournament.id}`);
          }}
        />
        <TournamentCardOptionDropdown
          refetch={refetch}
          tournamentId={tournament.id}
        />
      </div>
    </div>
  );
};

export default TournamentCard;
