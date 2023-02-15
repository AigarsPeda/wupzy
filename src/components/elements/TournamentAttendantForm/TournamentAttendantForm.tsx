import Input from "components/elements/Input/Input";
import RoundButton from "components/elements/RoundButton/RoundButton";
import Tooltip from "components/elements/Tooltip/Tooltip";
import type { FC } from "react";
import { BiInfoCircle } from "react-icons/bi";
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
  return (
    <div>
      <div className="flex w-full justify-end">
        <Tooltip
          position="-left-[3.8rem]"
          content="Enter the names of the players or teams who will be participating in the tournament. You can add players or teams by clicking the plus button."
        >
          <BiInfoCircle className="ml-2 h-5 w-5 text-gray-800" />
        </Tooltip>
      </div>
      <div>
        {attendants.map((attendant, index) => {
          return (
            <Input
              key={index}
              value={attendant}
              name="tournamentName"
              label={`Attendant ${index + 1}`}
              handleInputChange={(e) => {
                const newAttendants = [...attendants];
                newAttendants[index] = e.target.value;
                setAttendants(newAttendants);
              }}
            />
          );
        })}
      </div>
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
