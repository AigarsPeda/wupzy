import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import useFocus from "hooks/useFocus";
import type { FC } from "react";
import { useEffect } from "react";

interface TournamentCreateMetaFormProps {
  tournamentName: string;
  setTournamentName: (value: string) => void;
}

const TournamentCreateMetaForm: FC<TournamentCreateMetaFormProps> = ({
  tournamentName,
  setTournamentName,
}) => {
  const { htmlElRef, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <div className="mt-12 h-56">
      <div className="flex w-full">
        <Input
          ref={htmlElRef}
          name="tournamentName"
          value={tournamentName}
          label="Name of tournament"
          handleInputChange={(e) => {
            setTournamentName(e.target.value);
          }}
        />
      </div>
      <InfoParagraph text="Give your competition a name to make it easier to find later. * You can use date of competition or competition location" />
    </div>
  );
};

export default TournamentCreateMetaForm;
