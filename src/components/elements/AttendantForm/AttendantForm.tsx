import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import RoundButton from "components/elements/RoundButton/RoundButton";
import { DEFAULT_ATTENDANTS_COUNT } from "hardcoded";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import { BsPlusLg } from "react-icons/bs";

interface AttendantFormProps {
  attendants: string[];
  addNewAttendant: () => void;
  setAttendants: (value: string[]) => void;
}

const AttendantForm: FC<AttendantFormProps> = ({
  attendants,
  setAttendants,
  addNewAttendant,
}) => {
  const elRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const size = elRefs.current.length;

    if (size === 0 || elRefs.current.length === 0) return;

    // If there are no attendants, focus the first input
    if (attendants.length === DEFAULT_ATTENDANTS_COUNT) {
      elRefs.current[0]?.focus();
      return;
    }

    // If there are new attendants added, focus the last input
    elRefs.current && elRefs.current[size - 1]?.focus();
  }, [attendants.length]);

  return (
    <>
      <div className="max-h-[23rem] overflow-y-auto">
        {attendants.map((attendant, index) => {
          return (
            <Input
              key={index}
              value={attendant}
              name="tournamentName"
              label={`Attendant ${index + 1}`}
              ref={(el) => {
                if (!el) return;

                // create a new array with the new element
                elRefs.current = [...elRefs.current, el];
              }}
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
    </>
  );
};

export default AttendantForm;
