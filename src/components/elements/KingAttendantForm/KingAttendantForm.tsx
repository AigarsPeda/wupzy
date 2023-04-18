import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import Input from "components/elements/Input/Input";
import { DEFAULT_ATTENDANTS_COUNT } from "hardcoded";
import type { FC } from "react";
import { useEffect, useRef } from "react";

interface KingAttendantFormProps {
  kingAttendants: string[];
  addNewAttendant: () => void;
  setKingAttendants: (value: string[]) => void;
}

const KingAttendantForm: FC<KingAttendantFormProps> = ({
  kingAttendants,
  addNewAttendant,
  setKingAttendants,
}) => {
  const [parent] = useAutoAnimate();
  const elRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const size = elRefs.current.length;

    if (size === 0 || elRefs.current.length === 0) return;

    // If there are no attendants, focus the first input
    if (kingAttendants.length === DEFAULT_ATTENDANTS_COUNT) {
      elRefs.current[0]?.focus();
      return;
    }

    // If there are new attendants added, focus the last input
    elRefs.current && elRefs.current[size - 1]?.focus();
  }, [kingAttendants.length]);

  return (
    <>
      <InfoParagraph text="* To add player names, simply type them in the designated field. Need to add more players? Just click the plus button to add additional slots." />
      <div
        className="mt-8 max-h-[calc(100vh_-_18rem)] overflow-y-auto md:max-h-[calc(100vh_-_23rem)]"
        ref={parent}
      >
        {kingAttendants.map((attendant, index) => {
          return (
            <div key={index} className="f-full md:w-1/2">
              <Input
                size="sm"
                value={attendant}
                name="tournamentName"
                label={`Attendant ${index + 1}`}
                ref={(el) => {
                  if (!el) return;

                  // create a new array with the new element
                  elRefs.current = [...elRefs.current, el];
                }}
                handleInputChange={(e) => {
                  const newAttendants = [...kingAttendants];
                  newAttendants[index] = e.target.value;
                  setKingAttendants(newAttendants);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button btnTitle="Add attendant" onClick={addNewAttendant} />
    </>
  );
};

export default KingAttendantForm;
