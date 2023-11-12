import { type FC } from "react";
import SetSelect from "~/components/elements/SetSelect/SetSelect";

const OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface TournamentOptionsProps {
  sets: number;
  rounds: number;
  handleSetSelect: (sets: number) => void;
  handleSetRounds: (rounds: number) => void;
}

const TournamentOptions: FC<TournamentOptionsProps> = ({
  sets,
  rounds,
  handleSetRounds,
  handleSetSelect,
}) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <div className="flex">
        <fieldset>
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Set count
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Select sets count to win game.
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4">
            <SetSelect
              options={OPTIONS}
              selectedSetCount={sets}
              handleSetSelect={handleSetSelect}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Rounds
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose rounds for game play.
          </p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4">
            <SetSelect
              options={OPTIONS}
              selectedSetCount={rounds}
              handleSetSelect={handleSetRounds}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default TournamentOptions;
