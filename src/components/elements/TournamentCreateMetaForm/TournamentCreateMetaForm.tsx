import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import LargeSwitch from "components/elements/LargeSwitch/LargeSwitch";
import useFocus from "hooks/useFocus";
import type { FC } from "react";
import { useEffect } from "react";

interface TournamentCreateMetaFormProps {
  isKing: boolean;
  tournamentName: string;
  handleModeSwitch: () => void;
  setTournamentName: (value: string) => void;
}

const TournamentCreateMetaForm: FC<TournamentCreateMetaFormProps> = ({
  isKing,
  tournamentName,
  handleModeSwitch,
  setTournamentName,
}) => {
  const { htmlElRef, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <>
      <InfoParagraph
        // className="mt-6"
        text="* In 'king mode', participants are added one by one, and each participant plays against every other participant in randomly assigned pairs. In 'teams mode', teams are added and each team competes against every other team."
      />

      <div className="mt-12 flex flex-col">
        <div className="f-full md:w-1/2">
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
        <div className="mt-8">
          <LargeSwitch
            isOn={isKing}
            firstLabel="King"
            secondLabel="Teams"
            handleToggle={handleModeSwitch}
          />
        </div>
      </div>
    </>
  );
};

export default TournamentCreateMetaForm;
