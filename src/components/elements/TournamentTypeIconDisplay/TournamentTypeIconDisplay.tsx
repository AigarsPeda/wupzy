import { type FC } from "react";
import { BiCrown } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { type TournamentTypeType } from "~/types/tournament.types";

interface TournamentTypeIconDisplayProps {
  tournamentType: TournamentTypeType;
}

const TournamentTypeIconDisplay: FC<TournamentTypeIconDisplayProps> = ({
  tournamentType,
}) => {
  return (
    <>
      {tournamentType === "king" ? (
        // <Tooltip isNowrap content="King tournament">
        <BiCrown className="h-6 w-6 text-pink-500" />
      ) : (
        // </Tooltip>
        // <Tooltip isNowrap content="Team tournament">
        <RiTeamLine className="h-6 w-6 text-pink-500" />
        // </Tooltip>
      )}
    </>
  );
};

export default TournamentTypeIconDisplay;
