import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import LargeSwitch from "components/elements/LargeSwitch/LargeSwitch";
import NumberDropdown from "components/elements/NumberDropdown/NumberDropdown";
import useDelayUnmount from "hooks/useDelayUnmount";
import useFocus from "hooks/useFocus";
import type { FC } from "react";
import { useEffect } from "react";
import classNames from "utils/classNames";

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
  const { htmlElRef, setFocus } = useFocus();
  const { shouldRender, isAnimation } = useDelayUnmount(!isKing, 100);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <div className="h-full">
      <InfoParagraph text="* In 'king mode', participants are added one by one, and each participant plays against every other participant in randomly assigned pairs. In 'teams mode', teams are added and each team competes against every other team." />
      <div className="mt-8">
        <LargeSwitch
          isOn={isKing}
          firstLabel="King"
          secondLabel="Teams"
          handleToggle={handleModeSwitch}
        />
      </div>

      <div>
        <div className="flex items-end">
          <div className="mt-10 w-full md:mt-6 md:w-1/2">
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
          </div>
          <div className="relative ml-2 md:ml-4">
            {shouldRender && (
              <div
                className={classNames(
                  isAnimation ? "opacity-100" : "opacity-0",
                  "transition-all duration-300 ease-in-out"
                )}
              >
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
      </div>
    </div>
  );
};

export default TournamentCreateMetaForm;
