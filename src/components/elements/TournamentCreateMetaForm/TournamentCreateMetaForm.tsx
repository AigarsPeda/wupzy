import { useAutoAnimate } from "@formkit/auto-animate/react";
import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import LargeSwitch from "components/elements/LargeSwitch/LargeSwitch";
import NumberDropdown from "components/elements/NumberDropdown/NumberDropdown";
import useFocus from "hooks/useFocus";
import type { FC } from "react";
import { useEffect } from "react";

interface TournamentCreateMetaFormProps {
  isKing: boolean;
  gameSetCount: number;
  tournamentName: string;
  handleModeSwitch: () => void;
  setTournamentName: (value: string) => void;
  handleGameSetClick: (n: number | null) => void;
}

const TournamentCreateMetaForm: FC<TournamentCreateMetaFormProps> = ({
  isKing,
  gameSetCount,
  tournamentName,
  handleModeSwitch,
  setTournamentName,
  handleGameSetClick,
}) => {
  const [parent] = useAutoAnimate();

  const { htmlElRef, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <>
      <InfoParagraph text="* In 'king mode', participants are added one by one, and each participant plays against every other participant in randomly assigned pairs. In 'teams mode', teams are added and each team competes against every other team." />
      <div className="mt-8">
        <LargeSwitch
          isOn={isKing}
          firstLabel="King"
          secondLabel="Teams"
          handleToggle={handleModeSwitch}
        />
      </div>

      <div className="mt-12">
        <div className="f-full flex items-end transition-all" ref={parent}>
          <Input
            ref={htmlElRef}
            isMargin={false}
            name="tournamentName"
            value={tournamentName}
            label="Name of tournament"
            handleInputChange={(e) => {
              setTournamentName(e.target.value);
            }}
          />
          {!isKing && (
            <div className="relative ml-2 mt-3">
              <InfoParagraph text="* Sets to win a game" className="mb-1" />
              <NumberDropdown
                numArrayLength={12}
                count={gameSetCount}
                handleCountClick={handleGameSetClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TournamentCreateMetaForm;
