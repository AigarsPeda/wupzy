import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import RoundButton from "components/elements/RoundButton/RoundButton";
import useFocus from "hooks/useFocus";
import type { FC } from "react";
import { useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";

interface TournamentAttendantFormProps {
  attendants: string[];
  addNewAttendant: () => void;
  setAttendants: (value: string[]) => void;
}

const TournamentAttendantForm: FC<TournamentAttendantFormProps> = ({
  attendants,
  setAttendants,
  addNewAttendant,
}) => {
  const { htmlElRef, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  return (
    <div className="mt-12">
      <div>
        {attendants.map((attendant, index) => {
          return (
            <Input
              key={index}
              value={attendant}
              name="tournamentName"
              label={`Attendant ${index + 1}`}
              ref={index === 0 ? htmlElRef : null}
              handleInputChange={(e) => {
                const newAttendants = [...attendants];
                newAttendants[index] = e.target.value;
                setAttendants(newAttendants);
              }}
            />
          );
        })}
      </div>
      <InfoParagraph text="Enter the names of the players or teams who will be participating in the tournament. You can add players or teams by clicking the plus button." />
      <div className="flex w-full items-center justify-center">
        <RoundButton
          bgColor="green"
          btnType="button"
          handleClick={addNewAttendant}
          btnContent={<BsPlusLg className="m-2 h-6 w-6 text-white" />}
        />
      </div>
    </div>
  );
};

export default TournamentAttendantForm;
