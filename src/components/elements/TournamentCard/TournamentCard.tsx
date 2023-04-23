import Button from "components/elements/Button/Button";
import TournamentCardOptionDropdown from "components/elements/TournamentCardOptionDropdown/TournamentCardOptionDropdown";
import useRedirect from "hooks/useRedirect";
import type { FC } from "react";
import type { TournamentType } from "types/tournament.types";
import formatDate from "utils/formatDate";
import classNames from "../../../utils/classNames";

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
    <div className="relative rounded-lg border border-gray-100 bg-gray-100 px-2 py-1 text-left shadow-lg transition-all duration-200">
      <div className="mb-1 flex items-center">
        <p className="text-sm text-gray-400">{tournament.type}</p>
      </div>
      <div className="mb-2 flex flex-col space-y-3 border-b-2 border-gray-300 pb-4">
        <div className="mb-2 flex flex-col">
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
            btnSize="xs"
            fontSize="sm"
            btnColor="outline"
            btnTitle="Playoff"
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
      {/* <div
        className={classNames(
          tournament.type === "TEAMS" ? "bg-sky-500" : "bg-violet-500",
          "absolute left-0 top-1/2 h-28 w-1 -translate-x-1/2 -translate-y-1/2 transform rounded"
        )}
      /> */}
    </div>
  );
};

export default TournamentCard;
