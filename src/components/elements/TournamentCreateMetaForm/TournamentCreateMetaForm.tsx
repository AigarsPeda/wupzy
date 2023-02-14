import Input from "components/elements/Input/Input";
import Tooltip from "components/elements/Tooltip/Tooltip";
import type { FC } from "react";
import { BiInfoCircle } from "react-icons/bi";

interface TournamentCreateMetaFormProps {
  tournamentName: string;
  setTournamentName: (value: string) => void;
}

const TournamentCreateMetaForm: FC<TournamentCreateMetaFormProps> = ({
  tournamentName,
  setTournamentName,
}) => {
  return (
    <div className="flex">
      <Input
        name="tournamentName"
        value={tournamentName}
        label="Name of tournament"
        handleInputChange={(e) => {
          setTournamentName(e.target.value);
        }}
      />
      <Tooltip
        position="-left-[3.8rem]"
        content="Give your competition a name to make it easier to find later"
      >
        <BiInfoCircle className="ml-2 h-5 w-5 text-gray-800" />
      </Tooltip>
    </div>
  );
};

export default TournamentCreateMetaForm;
